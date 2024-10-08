import {
  ArgumentTypes,
  CreateDeckRequest,
  CreateDeckResponse,
  ListDecksRequest,
  ListDecksResponse,
  RpcHandler,
  RpcRequest,
  RPCResponseType,
} from "./types";

export type TRpcHandlers = {
  listDecks: (data: ListDecksRequest) => Promise<ListDecksResponse>;
  scryfallBulkDataLoader: (data: object) => Promise<string[]>;
  createDeck: (data: CreateDeckRequest) => Promise<CreateDeckResponse>;
};

export type TRpcEvent = {
  reply: (channel: string, ...args: any[]) => void;
};

export type TRpcMain = {
  on: (
    channel: string,
    handler: (event: TRpcEvent, request: RpcRequest<any>) => void
  ) => void;
};

export type TRpcServer = {
  [key in keyof TRpcHandlers]: (
    event: TRpcEvent,
    data: RpcRequest<ArgumentTypes<TRpcHandlers[key]>[0]>
  ) => Promise<RPCResponseType<TRpcHandlers[key]>>;
};

export class RpcServer implements TRpcServer {
  constructor(private ipc: TRpcMain, private handlers: TRpcHandlers) {
    console.log("handlers", this.handlers);
    this.handlers = handlers;
    this.ipc = ipc;
  }

  async listDecks(
    event: TRpcEvent,
    data: RpcRequest<ListDecksRequest>
  ): Promise<ListDecksResponse> {
    const wrapped = this.wrapHandler(this.handlers.listDecks);

    try {
      const result = await wrapped(event, data);
      return result;
    } catch (error) {
      console.log("failed to list decks", error);
    }

    return;
  }

  async scryfallBulkDataLoader(
    event: TRpcEvent,
    data: RpcRequest<object>
  ): Promise<string[]> {
    const wrapped = this.wrapHandler(this.handlers.scryfallBulkDataLoader);

    try {
      const result = await wrapped(event, data);
      return result;
    } catch (error) {
      console.log("failed to load scryfall bulk data", error);
    }
  }

  async createDeck(
    event: TRpcEvent,
    data: RpcRequest<CreateDeckRequest>
  ): Promise<CreateDeckResponse> {
    const wrapped = this.wrapHandler(this.handlers.createDeck);

    try {
      const result = await wrapped(event, data);
      return result;
    } catch (error) {
      console.log("failed to create deck", error);
    }
  }

  registerHandlers() {
    this.ipc.on("listDecks", (event, data) => {
      try {
        this.listDecks(event, data);
      } catch (error) {
        console.log("failed to list decks from register handlers", error);
      }
    });
  }

  private wrapHandler<T, P>(
    handler: RpcHandler<T, P>
  ): (event: TRpcEvent, request: RpcRequest<T>) => Promise<P> {
    return async (event: TRpcEvent, request: RpcRequest<T>) => {
      try {
        const result = await handler(request.data);
        event.reply(request.responseChannel, result);
        return result;
      } catch (error) {
        console.log("failed to handle wrapped request", error);
        return null;
      }
    };
  }
}

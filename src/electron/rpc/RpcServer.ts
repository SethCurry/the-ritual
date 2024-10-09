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
import { GetDeckByIdRequest, GetDeckByIdResponse } from "./models/DeckModels";

export type TRpcHandlers = {
  listDecks: (data: ListDecksRequest) => Promise<ListDecksResponse>;
  getDeckById: (data: GetDeckByIdRequest) => Promise<GetDeckByIdResponse>;
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

  private async invoke<T, P>(
    handler: RpcHandler<T, P>,
    event: TRpcEvent,
    data: RpcRequest<T>
  ): Promise<P> {
    console.log("invoking handler", handler);
    const wrapped = this.wrapHandler(handler);

    try {
      console.log("invoking wrapped handler");
      const result = await wrapped(event, data);
      console.log("got result", result);
      return result;
    } catch (error) {
      console.log("failed to invoke handler", error);
    }
  }

  async getDeckById(
    event: TRpcEvent,
    data: RpcRequest<GetDeckByIdRequest>
  ): Promise<GetDeckByIdResponse> {
    return this.invoke(this.handlers.getDeckById, event, data);
  }

  async listDecks(
    event: TRpcEvent,
    data: RpcRequest<ListDecksRequest>
  ): Promise<ListDecksResponse> {
    return this.invoke(this.handlers.listDecks, event, data);
  }

  async scryfallBulkDataLoader(
    event: TRpcEvent,
    data: RpcRequest<object>
  ): Promise<string[]> {
    return this.invoke(this.handlers.scryfallBulkDataLoader, event, data);
  }

  async createDeck(
    event: TRpcEvent,
    data: RpcRequest<CreateDeckRequest>
  ): Promise<CreateDeckResponse> {
    return this.invoke(this.handlers.createDeck, event, data);
  }

  registerHandlers() {
    this.ipc.on("listDecks", (event, data) => {
      this.listDecks(event, data);
    });

    this.ipc.on("getDeckById", (event, data) => {
      this.getDeckById(event, data);
    });

    this.ipc.on("createDeck", (event, data) => {
      this.createDeck(event, data);
    });

    this.ipc.on("scryfallBulkDataLoader", (event, data) => {
      this.scryfallBulkDataLoader(event, data);
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

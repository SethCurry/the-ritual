import {
  ArgumentTypes,
  ListDecksRequest,
  ListDecksResponse,
  RpcHandler,
  RpcRequest,
} from "./types";

export type TRpcHandlers = {
  listDecks: (data: ListDecksRequest) => Promise<ListDecksResponse>;
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
  ) => Promise<void>;
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
  ): Promise<void> {
    const wrapped = this.wrapHandler(this.handlers.listDecks);

    try {
      const result = await wrapped(event, data);
    } catch (error) {
      console.log("failed to list decks", error);
    }

    return;
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

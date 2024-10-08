export type RpcRequest<T> = {
  responseChannel: string;
  data: T;
};

export type RpcHandler<T, P> = (data: T) => Promise<P>;

export interface ListDecksRequest {
  name?: string;
}

export interface ListDecksResponse {
  decks: ListDecksItem[];
}

export interface ListDecksItem {
  id: number;
  name: string;
}

export interface CreateDeckRequest {
  name: string;
}

export interface CreateDeckResponse {
  id: number;
  name: string;
}

export type ArgumentTypes<F extends Function> = F extends (
  ...args: infer A
) => any
  ? A
  : never;

export type RPCResponseType<F extends Function> = F extends (
  ...args: any[]
) => Promise<infer R>
  ? R
  : never;

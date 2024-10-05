import { IpcRequest } from "./IpcRequest";

export interface IpcService<T, R> {
  channel: string;

  serve: (event: any, request: IpcRequest<T>) => Promise<R>;
}

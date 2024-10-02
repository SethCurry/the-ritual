import { IpcMainEvent } from "electron";
import { IpcRequest } from "../../ipc/IpcRequest";

export interface IIpcChannel<T> {
  name: string;

  handle(event: IpcMainEvent, request: IpcRequest<T>): void;
}

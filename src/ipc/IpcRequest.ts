/**
 * IpcRequest is a generic wrapper for data passed via an IPC request.
 */
export interface IpcRequest<T> {
  responseChannel?: string;

  data: T;
}

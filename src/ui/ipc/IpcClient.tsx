import { IpcRenderer, ipcRenderer } from "electron";
import { IpcRequest } from "../../ipc/IpcRequest";

export default class IpcClient<T, P> {
  private ipcRenderer?: IpcRenderer;
  public readonly channel: string;

  constructor(channel: string) {
    this.channel = channel;
    this.ipcRenderer = ipcRenderer;

    if (!window || !window.process || !window.require) {
      throw new Error("Not in Electron environment");
    }
  }

  public send<T>(data: T): Promise<P> {
    const request: IpcRequest<T> = {
      responseChannel: `${this.channel}-response-${new Date().getTime()}`,
      data,
    };

    this.ipcRenderer.send(this.channel, request);

    return new Promise((resolve, reject) => {
      this.ipcRenderer.once(request.responseChannel, (event, response) =>
        resolve(response)
      );
    });
  }
}

import { IpcRenderer, ipcRenderer } from "electron";
import { IpcRequest } from "../../ipc/IpcRequest";

export class IpcService<T, P> {
  private ipcRenderer?: IpcRenderer;
  public readonly channel: string;

  constructor(channel: string) {
    this.channel = channel;
    this.ipcRenderer = ipcRenderer;

    if (!window || !window.process || !window.require) {
      throw new Error("Not in Electron environment");
    }
  }

  public send<T>(channel: string, request: IpcRequest<T>): Promise<P> {
    if (!request.responseChannel) {
      request.responseChannel = `${channel}-response-${new Date().getTime()}`;
    }

    this.ipcRenderer.send(channel, request);

    return new Promise((resolve, reject) => {
      this.ipcRenderer.once(request.responseChannel, (event, response) =>
        resolve(response)
      );
    });
  }
}

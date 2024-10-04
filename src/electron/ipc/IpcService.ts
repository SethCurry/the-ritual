import { IpcMainEvent } from "electron";
import { IpcRequest } from "../../ipc/IpcRequest";

export default abstract class IpcService<T, P> {
  abstract channel: string;

  abstract onRequest(event: IpcMainEvent, request: T): Promise<P | null>;

  async serve(event: IpcMainEvent, request: IpcRequest<T>): Promise<void> {
    const response = await this.onRequest(event, request.data);

    if (response) {
      var responseChannel = this.channel + "-response";
      if (request.responseChannel) {
        responseChannel = request.responseChannel;
      }

      event.reply(responseChannel, response);
    }
    return;
  }
}

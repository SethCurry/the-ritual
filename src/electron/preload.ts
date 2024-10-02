// See the Electron documentation for details on how to use preload scripts:

import { contextBridge, ipcRenderer, IpcRendererEvent, shell } from "electron";
import { ScryfallBulkDataLoaderServiceChannel } from "../ipc/IpcServiceChannels";

// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
process.once("loaded", () => {
  contextBridge.exposeInMainWorld("ritual", {
    on(
      eventName: string,
      callback: (event: IpcRendererEvent, ...args: any[]) => void
    ) {
      ipcRenderer.on(eventName, callback);
    },

    async scryfallBulkDataLoader() {
      ipcRenderer.send(ScryfallBulkDataLoaderServiceChannel, {});

      return new Promise((resolve, reject) => {
        ipcRenderer.once(
          ScryfallBulkDataLoaderServiceChannel,
          (event, files) => {
            resolve(files);
          }
        );
      });
    },
  });
});

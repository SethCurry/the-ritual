// See the Electron documentation for details on how to use preload scripts:

import { contextBridge, ipcRenderer, IpcRendererEvent, shell } from "electron";
import {
  CreateDeckServiceChannel,
  ListDecksServiceChannel,
  ScryfallBulkDataLoaderServiceChannel,
} from "../ipc/IpcServiceChannels";

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

    async listDecks() {
      ipcRenderer.send(ListDecksServiceChannel, {});

      return new Promise((resolve, reject) => {
        ipcRenderer.once(ListDecksServiceChannel, (event, decks) => {
          resolve(decks);
        });
      });
    },

    async createDeck(name: string) {
      ipcRenderer.send(CreateDeckServiceChannel, { data: { name } });

      return new Promise((resolve, reject) => {
        ipcRenderer.once(CreateDeckServiceChannel, (event, deck) => {
          resolve({});
        });
      });
    },
  });
});

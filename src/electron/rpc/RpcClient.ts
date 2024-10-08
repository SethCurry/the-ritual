import { ipcRenderer } from "electron";
import { RpcServer, TRpcServer } from "./RpcServer";
import { RpcRequest } from "./types";

export type TRpcClient = {
  [key in keyof TRpcServer]: TRpcServer[key];
};

export function createRpcClient(): TRpcClient {
  const ret = {};

  console.log("creating client");

  for (const key of Object.getOwnPropertyNames(RpcServer.prototype)) {
    if (["constructor", "wrapHandler", "registerHandlers"].includes(key)) {
      continue;
    }
    console.log("key", key);
    Object.assign(ret, {
      [key]: async (data: any) => {
        const responseChannel = key + "-response-" + Math.random().toString();
        const request: RpcRequest<any> = {
          responseChannel,
          data: data,
        };
        ipcRenderer.send(key, request);

        return new Promise((resolve, reject) => {
          try {
            ipcRenderer.once(responseChannel, (event, resp) => {
              resolve(resp);
            });
          } catch (e) {
            reject(e);
          }
        });
      },
    });
  }

  return ret as TRpcClient;
}

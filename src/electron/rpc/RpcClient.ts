import { ipcRenderer } from "electron";
import { RpcServer, TRpcServer } from "./RpcServer";
import { ArgumentTypes, RpcRequest } from "./types";

export type RpcRequestType<R> = R extends RpcRequest<infer T> ? T : never;

export type TRpcClient = {
  [key in keyof TRpcServer]: (
    data: RpcRequestType<ArgumentTypes<TRpcServer[key]>[1]>
  ) => ReturnType<TRpcServer[key]>;
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
        console.log(
          "sending RPC request for ",
          key,
          " with response channel ",
          responseChannel
        );

        const request: RpcRequest<any> = {
          responseChannel,
          data: data,
        };
        ipcRenderer.send(key, request);
        console.log("sent RPC request for ", key);

        return new Promise((resolve, reject) => {
          try {
            console.log("waiting for RPC response for ", key);
            ipcRenderer.once(responseChannel, (event, resp) => {
              console.log("got RPC response for ", key);
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

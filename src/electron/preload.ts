// See the Electron documentation for details on how to use preload scripts:

import { contextBridge } from "electron";
import { createRpcClient } from "./rpc/RpcClient";

// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
process.once("loaded", () => {
  contextBridge.exposeInMainWorld("rpc", createRpcClient());
});

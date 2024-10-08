import type { TRpcClient } from "../electron/rpc/RpcClient";

declare global {
  interface Window {
    rpc: TRpcClient;
  }
}

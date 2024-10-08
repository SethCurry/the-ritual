import { TRpcClient } from "../electron/rpc/RpcClient";

export interface CustomWindow extends Window {
  rpc: TRpcClient;
}

export function getRpc() {
  return (window as unknown as CustomWindow).rpc;
}

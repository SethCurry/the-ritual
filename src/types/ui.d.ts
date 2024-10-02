import { IExposedContext } from "src/electron/ipc/services/ExposedContext";

declare global {
  interface Window {
    ritual: IExposedContext;
  }
}

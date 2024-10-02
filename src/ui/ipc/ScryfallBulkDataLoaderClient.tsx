import IpcClient from "./IpcClient";
import { ScryfallBulkDataLoaderServiceChannel } from "../../ipc/IpcServiceChannels";

const ScryfallBulkDataLoaderClient = new IpcClient<{}, string[]>(
  ScryfallBulkDataLoaderServiceChannel
);

export default ScryfallBulkDataLoaderClient;

import { dialog, IpcMainEvent } from "electron";
import { DataSource } from "typeorm";
import { loadScryfallBulkData } from "../../data/db/etl/ScryfallETL";
import IpcService from "../IpcService";
import { ScryfallBulkDataLoaderServiceChannel } from "../../../ipc/IpcServiceChannels";

export default class ScryfallBulkDataLoaderService extends IpcService<
  null,
  string[]
> {
  readonly channel: string;

  constructor(private readonly db: DataSource) {
    super();
    this.channel = ScryfallBulkDataLoaderServiceChannel;
  }

  async onRequest(event: IpcMainEvent, request: {}): Promise<string[]> {
    const files = dialog.showOpenDialogSync({
      title: "Scryfall Bulk Data File",
      filters: [{ name: "JSON", extensions: ["json"] }],
    });

    for (const file of files) {
      await loadScryfallBulkData(file, this.db);
    }

    return files;
  }
}

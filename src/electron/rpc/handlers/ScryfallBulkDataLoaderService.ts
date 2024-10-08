import { dialog } from "electron";
import { DataSource } from "typeorm";
import { loadScryfallBulkData } from "../../data/db/etl/ScryfallETL";
import { RpcHandler } from "../types";

export function createScryfallBulkDataLoaderHandler(
  db: DataSource
): RpcHandler<object, string[]> {
  return async (data: object) => {
    const files = dialog.showOpenDialogSync({
      title: "Scryfall Bulk Data File",
      filters: [{ name: "JSON", extensions: ["json"] }],
    });

    if (!files) {
      return [];
    }

    for (const file of files) {
      await loadScryfallBulkData(file, this.db);
    }

    return files;
  };
}

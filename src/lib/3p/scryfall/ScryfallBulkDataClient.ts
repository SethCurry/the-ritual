import ScryfallBulkData from "./responses/ScryfallBulkData";
import ScryfallClientBase from "./ScryfallClientBase";

export default class ScryfallBulkDataClient extends ScryfallClientBase {
  async list(): Promise<ScryfallBulkData[]> {
    return this.doRequest<ScryfallBulkData[]>(() =>
      fetch("https://api.scryfall.com/bulk-data")
    );
  }
}

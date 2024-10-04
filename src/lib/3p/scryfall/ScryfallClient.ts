import RateLimiter from "../../util/RateLimiter";
import ScryfallBulkDataClient from "./ScryfallBulkDataClient";
import ScryfallCardClient from "./ScryfallCardClient";

export default class ScryfallClient {
  cards: ScryfallCardClient;
  bulkData: ScryfallBulkDataClient;

  private rateLimiter: RateLimiter;

  constructor() {
    this.rateLimiter = new RateLimiter(10, 1);
    this.cards = new ScryfallCardClient(this.rateLimiter);
    this.bulkData = new ScryfallBulkDataClient(this.rateLimiter);
  }
}

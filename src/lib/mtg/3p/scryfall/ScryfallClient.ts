import RateLimiter from "../../../util/RateLimiter";
import ScryfallCardClient from "./ScryfallCardClient";

export default class ScryfallClient {
  cards: ScryfallCardClient;

  private rateLimiter: RateLimiter;

  constructor() {
    this.rateLimiter = new RateLimiter(10, 1);
    this.cards = new ScryfallCardClient(this.rateLimiter);
  }
}

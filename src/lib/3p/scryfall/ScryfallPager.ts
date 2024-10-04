import RateLimiter from "../../util/RateLimiter";
import ScryfallList from "./responses/ScryfallList";

export default class ScryfallPager<T> {
  private nextUrl: string | null;

  constructor(next: string, private rateLimiter: RateLimiter) {
    this.rateLimiter = rateLimiter;
    this.nextUrl = next;
  }

  hasMore(): boolean {
    return this.nextUrl !== null;
  }

  async next(): Promise<T[]> {
    if (!this.hasMore()) {
      throw new Error("No more pages");
    }

    const response = await this.rateLimiter.doRequest(() =>
      fetch(this.nextUrl)
    );

    const respJson = (await response.json()) as ScryfallList<T>;

    this.nextUrl = respJson.next_page ? respJson.next_page : null;

    return respJson.data;
  }
}

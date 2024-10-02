import RateLimiter from "../../../util/RateLimiter";

export default abstract class ScryfallClientBase {
  protected rateLimiter: RateLimiter;

  constructor(rateLimiter: RateLimiter) {
    this.rateLimiter = rateLimiter;
  }

  protected async doRequest<T>(
    callback: () => Promise<Response>,
    maxWaitSeconds?: number
  ): Promise<T> {
    const response = await this.rateLimiter.doRequest(callback, maxWaitSeconds);

    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }

    return response.json();
  }
}

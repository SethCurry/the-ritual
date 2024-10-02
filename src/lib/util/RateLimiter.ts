import sleep from "./sleep";

export default class RateLimiter {
  private readonly requestsPerSecond: number;
  private readonly windowSeconds: number;
  private requests: number[];

  constructor(requestsPerSecond: number, windowSeconds: number) {
    this.requestsPerSecond = requestsPerSecond;
    this.windowSeconds = windowSeconds;
    this.requests = [];
  }

  private clearOldRequests() {
    const cutoff = Date.now() - this.windowSeconds * 1000;

    this.requests = this.requests.filter((request) => request > cutoff);
  }

  private hasAvailableRequest() {
    this.clearOldRequests();

    if (this.requests.length < this.requestsPerSecond * this.windowSeconds) {
      return true;
    }

    return false;
  }

  private addRequest() {
    this.requests.push(Date.now());
  }

  async doRequest<T>(
    callback: () => Promise<T>,
    maxWaitSeconds?: number
  ): Promise<T> {
    const waitTime = maxWaitSeconds ? maxWaitSeconds : 5;

    const endTime = Date.now() + waitTime * 1000;

    return new Promise(async (resolve, reject) => {
      while (true) {
        if (maxWaitSeconds && Date.now() > endTime) {
          reject(new Error("unable to make request in time"));
        }

        if (this.hasAvailableRequest()) {
          this.addRequest();
          try {
            await callback().then(resolve).catch(reject);
          } catch (e) {
            reject(e);
          }
          break;
        }
        await sleep(100);
      }
    });
  }
}

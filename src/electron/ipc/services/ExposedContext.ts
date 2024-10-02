export default interface IExposedContext {
  scryfallBulkDataLoader: () => Promise<string[]>;
}

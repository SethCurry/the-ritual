import Deck from "../electron/data/db/models/Deck";

export default interface IExposedContext {
  scryfallBulkDataLoader: () => Promise<string[]>;
  listDecks: () => Promise<Deck[]>;
  createDeck: (name: string) => Promise<Deck>;
}

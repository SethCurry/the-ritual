import type Deck from "../data/db/models/Deck";

declare global {
  interface Window {
    ritual: {
      scryfallBulkDataLoader: () => Promise<string[]>;
      listDecks: () => Promise<Deck[]>;
      createDeck: (name: string) => Promise<Deck>;
    };
  }
}

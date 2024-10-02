import ScryfallCard from "../responses/ScryfallCard";

/**
 * A client for querying cards from Scryfall.
 */
export default interface IScryfallCardClient {
  /**
   * Queries Scryfall for a card with the given name and returns it.
   *
   * @param cardName - The name of the card to query for.
   * @returns The card object from Scryfall.
   */
  named(cardName: string): Promise<ScryfallCard>;
}

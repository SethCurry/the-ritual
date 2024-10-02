import ScryfallCard from "./responses/ScryfallCard";
import ScryfallList from "./responses/ScryfallList";
import ScryfallClientBase from "./ScryfallClientBase";
import ScryfallPager from "./ScryfallPager";

export interface ScryfallCardIdentifier {
  id?: string;
  mtgo_id?: number;
  multiverse_id?: number;
  oracle_id?: string;
  illustration_id?: string;
  name?: string;
  "name,set"?: string[];
  "collector_number,set"?: string[];
}

export default class ScryfallCardClient extends ScryfallClientBase {
  /**
   * Queries Scryfall for a card with the given name and returns it.
   *
   * @param cardName - The name of the card to query for.
   * @returns The card object from Scryfall.
   * @throws An error if the request fails.
   */
  async named(cardName: string): Promise<ScryfallCard> {
    const url = new URL("https://api.scryfall.com/cards/named");
    url.searchParams.set("fuzzy", cardName);
    return this.doRequest<ScryfallCard>(() => fetch(url.toString()));
  }

  search(query: string): ScryfallPager<ScryfallCard> {
    const url = new URL("https://api.scryfall.com/cards/search");
    url.searchParams.set("q", query);

    return new ScryfallPager<ScryfallCard>(url.toString(), this.rateLimiter);
  }

  async autocomplete(partialName: string): Promise<string[]> {
    const url = new URL("https://api.scryfall.com/cards/autocomplete");
    url.searchParams.set("q", partialName);

    const response = await this.doRequest<ScryfallList<string>>(() =>
      fetch(url.toString())
    );

    return response.data;
  }

  async collection(
    identifiers: ScryfallCardIdentifier[]
  ): Promise<ScryfallCard[]> {
    const url = new URL("https://api.scryfall.com/cards/collection");
    const requestBody = JSON.stringify({
      identifiers: identifiers,
    });

    const response = await this.doRequest<ScryfallList<ScryfallCard>>(() =>
      fetch(url.toString(), {
        method: "POST",
        body: requestBody,
      })
    );

    return response.data;
  }

  async setAndNumber(
    setCode: string,
    collectorNumber: string,
    lang?: string
  ): Promise<ScryfallCard> {
    var url = `https://api.scryfall.com/cards/${setCode}/${collectorNumber}`;
    if (lang) {
      url += `/${lang}`;
    }

    return this.doRequest<ScryfallCard>(() => fetch(url.toString()));
  }

  async multiverseId(multiverseId: number): Promise<ScryfallCard> {
    const url = `https://api.scryfall.com/cards/multiverse/${multiverseId}`;

    return this.doRequest<ScryfallCard>(() => fetch(url.toString()));
  }

  async mtgoId(mtgoId: number): Promise<ScryfallCard> {
    const url = `https://api.scryfall.com/cards/mtgo/${mtgoId}`;

    return this.doRequest<ScryfallCard>(() => fetch(url.toString()));
  }

  async arenaId(arenaId: number): Promise<ScryfallCard> {
    const url = `https://api.scryfall.com/cards/arena/${arenaId}`;

    return this.doRequest<ScryfallCard>(() => fetch(url.toString()));
  }

  async tcgplayerId(tcgPlayerId: number): Promise<ScryfallCard> {
    const url = `https://api.scryfall.com/cards/tcgplayer/${tcgPlayerId}`;

    return this.doRequest<ScryfallCard>(() => fetch(url.toString()));
  }

  async cardmarketId(cardmarketId: number): Promise<ScryfallCard> {
    const url = `https://api.scryfall.com/cards/cardmarket/${cardmarketId}`;

    return this.doRequest<ScryfallCard>(() => fetch(url.toString()));
  }

  async id(id: string): Promise<ScryfallCard> {
    const url = `https://api.scryfall.com/cards/${id}`;

    return this.doRequest<ScryfallCard>(() => fetch(url.toString()));
  }
}

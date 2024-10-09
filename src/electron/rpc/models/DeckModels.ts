import { DeckList } from "../../../lib/mtg/decklist/DeckList";

export interface GetDeckByIdRequest {
  id: number;
}

export interface GetDeckByIdResponse {
  id: number;
  name: string;
  deckList: DeckList;
}

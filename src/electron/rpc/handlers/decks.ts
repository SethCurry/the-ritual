import { DataSource } from "typeorm";
import { ListDecksRequest, ListDecksResponse, RpcHandler } from "../types";
import Deck from "../../data/db/models/Deck";

export function createListDecksHandler(
  db: DataSource
): RpcHandler<ListDecksRequest, ListDecksResponse> {
  return async (data: ListDecksRequest) => {
    const decks = await db.getRepository(Deck).find();
    return { decks: decks.map((deck) => ({ id: deck.id, name: deck.name })) };
  };
}

export interface CreateDeckRequest {
  name: string;
}

export function createCreateDeckHandler(
  db: DataSource
): RpcHandler<CreateDeckRequest, number> {
  return async (data: CreateDeckRequest) => {
    const deckRepo = db.getRepository(Deck);
    const deck = await deckRepo.create({ name: data.name });
    await deckRepo.save(deck);
    return deck.id;
  };
}

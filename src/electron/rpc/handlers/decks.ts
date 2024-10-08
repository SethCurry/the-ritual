import { DataSource } from "typeorm";
import {
  CreateDeckRequest,
  CreateDeckResponse,
  ListDecksRequest,
  ListDecksResponse,
  RpcHandler,
} from "../types";
import Deck from "../../data/db/models/Deck";

export function createListDecksHandler(
  db: DataSource
): RpcHandler<ListDecksRequest, ListDecksResponse> {
  return async (data: ListDecksRequest) => {
    const decks = await db.getRepository(Deck).find();
    return { decks: decks.map((deck) => ({ id: deck.id, name: deck.name })) };
  };
}

export function createCreateDeckHandler(
  db: DataSource
): RpcHandler<CreateDeckRequest, CreateDeckResponse> {
  return async (data: CreateDeckRequest) => {
    const deckRepo = db.getRepository(Deck);
    const deck = await deckRepo.create({ name: data.name });
    await deckRepo.save(deck);
    return { id: deck.id, name: deck.name };
  };
}

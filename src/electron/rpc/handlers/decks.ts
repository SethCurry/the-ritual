import { DataSource } from "typeorm";
import {
  CreateDeckRequest,
  CreateDeckResponse,
  ListDecksRequest,
  ListDecksResponse,
  RpcHandler,
} from "../types";
import Deck from "../../data/db/models/Deck";
import { GetDeckByIdRequest, GetDeckByIdResponse } from "../models/DeckModels";
import DeckCard from "../../data/db/models/DeckCard";

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

export function getDeckByIdHandler(
  db: DataSource
): RpcHandler<GetDeckByIdRequest, GetDeckByIdResponse> {
  return async (data: GetDeckByIdRequest) => {
    const deck = await db
      .getRepository(Deck)
      .findOne({ where: { id: data.id } });
    if (!deck) {
      throw new Error("Deck not found");
    }

    const cards = await db.getRepository(DeckCard).find({
      where: { deck: { id: deck.id } },
    });

    const ret = {
      id: deck.id,
      name: deck.name,
      deckList: {
        maindeck: cards
          .filter((c) => c.maindeck)
          .map((c) => {
            return {
              name: c.printing.card.name,
              count: c.quantity,
              setCode: c.printing.set.code,
              collectorNumber: c.printing.collectorNumber,
            };
          }),
        sideboard: cards
          .filter((c) => !c.maindeck)
          .map((c) => {
            return {
              name: c.printing.card.name,
              count: c.quantity,
              setCode: c.printing.set.code,
              collectorNumber: c.printing.collectorNumber,
            };
          }),
      },
    };

    console.log("got deck", ret);

    return ret;
  };
}

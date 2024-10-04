import { DataSource } from "typeorm";
import { mapScryfallBulkData } from "../../../../lib/3p/scryfall/ScryfallBulkReader";
import Artist from "../models/Artist";
import CardSet from "../models/CardSet";
import { AllColors } from "../../../../lib/mtg/Colors";
import Color from "../models/Color";
import Card from "../models/Card";

export async function loadArtistsFromScryfallBulkData(
  filePath: string,
  db: DataSource
) {
  const seenArtists = new Set<string>();
  const artistRepo = db.getRepository(Artist);

  return mapScryfallBulkData(filePath, async (card) => {
    if (seenArtists.has(card.artist)) {
      return;
    }

    seenArtists.add(card.artist);

    const foundArtist = await artistRepo.findOneBy({
      name: card.artist,
    });

    if (foundArtist === null) {
      const newArtist = new Artist();
      newArtist.name = card.artist;

      await artistRepo.save(newArtist);
    }
  });
}

export async function loadCardsFromScryfallBulkData(
  filePath: string,
  db: DataSource
) {
  const cardRepo = db.getRepository(Card);

  return mapScryfallBulkData(filePath, async (card) => {
    const existingCard = await cardRepo.findOne({
      where: {
        scryfallId: card.id,
      },
    });

    if (existingCard === null) {
      const newCard = new Card();
      newCard.scryfallId = card.id;
      newCard.name = card.name;
      newCard.oracleId = card.oracle_id;
      newCard.layout = card.layout;
      newCard.manaCost = card.mana_cost;
      newCard.typeLine = card.type_line;
      newCard.oracleText = card.oracle_text;
      newCard.power = card.power;
      newCard.toughness = card.toughness;
      newCard.loyalty = card.loyalty;
      newCard.reserved = card.reserved;
      newCard.cmc = card.cmc;
      newCard.edhrecRank = card.edhrec_rank;
      newCard.pennyRank = card.penny_rank;
      newCard.releasedAt = card.released_at;
      newCard.legalityStandard = card.legalities.standard;
      newCard.legalityFuture = card.legalities.future;
      newCard.legalityHistoric = card.legalities.historic;
      newCard.legalityGladiator = card.legalities.gladiator;
      newCard.legalityPioneer = card.legalities.pioneer;
      newCard.legalityExplorer = card.legalities.explorer;
      newCard.legalityModern = card.legalities.modern;
      newCard.legalityLegacy = card.legalities.legacy;
      newCard.legalityPauper = card.legalities.pauper;
      newCard.legalityCommander = card.legalities.commander;
      newCard.legalityDuel = card.legalities.duel;
      newCard.legalityOldschool = card.legalities.oldschool;
      newCard.legalityPremodern = card.legalities.premodern;
      newCard.legalityPredh = card.legalities.predh;

      await cardRepo.save(newCard);
    }
  });
}

export async function loadSetsFromScryfallBulkData(
  filePath: string,
  db: DataSource
) {
  const setRepo = db.getRepository(CardSet);

  const seenSets = new Set<string>();

  return mapScryfallBulkData(filePath, async (card) => {
    if (seenSets.has(card.set)) {
      return;
    }

    seenSets.add(card.set);

    const foundSet = await setRepo.findOneBy({
      code: card.set,
    });

    if (foundSet === null) {
      const newSet = new CardSet();
      newSet.code = card.set;
      newSet.name = card.set_name;

      await setRepo.save(newSet);
    }
  });
}

export async function loadColors(db: DataSource) {
  const colorRepo = db.getRepository(Color);

  for (const color of AllColors) {
    const foundColor = await colorRepo.findOneBy({
      name: color.name,
    });

    if (foundColor === null) {
      const newColor = new Color();
      newColor.name = color.name;
      newColor.symbol = color.symbol;

      await colorRepo.save(newColor);
    }
  }
}

export async function loadScryfallBulkData(filePath: string, db: DataSource) {
  const colors = await loadColors(db);
  const artists = await loadArtistsFromScryfallBulkData(filePath, db);
  const sets = await loadSetsFromScryfallBulkData(filePath, db);
  const cards = await loadCardsFromScryfallBulkData(filePath, db);
  return { colors, artists, sets, cards };
}

import { DataSource } from "typeorm";
import { mapScryfallBulkData } from "../../../../lib/mtg/3p/scryfall/ScryfallBulkReader";
import Artist from "../models/Artist";
import CardSet from "../models/CardSet";
import { AllColors } from "../../../../lib/mtg/Colors";
import Color from "../models/Color";

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

    console.log("Checking artist", card.artist);
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

    console.log("Checking set", card.set_name);
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
  return Promise.all([
    loadColors(db),
    loadArtistsFromScryfallBulkData(filePath, db),
    loadSetsFromScryfallBulkData(filePath, db),
  ]);
}

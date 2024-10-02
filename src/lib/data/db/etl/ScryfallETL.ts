import { DataSource } from "typeorm";
import { mapScryfallBulkData } from "../../../mtg/3p/scryfall/ScryfallBulkReader";
import Artist from "../models/Artist";
import CardSet from "../models/CardSet";
import { AllColors } from "../../../mtg/Colors";
import Color from "../models/Color";

export async function loadArtistsFromScryfallBulkData(
  filePath: string,
  db: DataSource
) {
  const artistRepo = db.getRepository(Artist);

  return mapScryfallBulkData(filePath, async (card) => {
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

  return mapScryfallBulkData(filePath, async (card) => {
    const foundSet = await setRepo.findOneBy({
      code: card.set_code,
    });

    if (foundSet === null) {
      const newSet = new CardSet();
      newSet.code = card.set_code;
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
  await loadColors(db);
  await loadArtistsFromScryfallBulkData(filePath, db);
  await loadSetsFromScryfallBulkData(filePath, db);
}

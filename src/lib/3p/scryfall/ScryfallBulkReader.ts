import { chain } from "stream-chain";
import { parser } from "stream-json";
import { streamArray } from "stream-json/streamers/StreamArray";
import ScryfallCard from "./responses/ScryfallCard";
import fs from "fs";

export async function mapScryfallBulkData(
  filePath: string,
  callback: (card: ScryfallCard) => Promise<void>
) {
  return new Promise((resolve, reject) => {
    const pipeline = chain([
      fs.createReadStream(filePath),
      parser(),
      streamArray(),
      async (data) => {
        const card = data.value as ScryfallCard;
        await callback(card);
      },
    ]);

    pipeline.on("error", (error) => {
      reject(error);
    });

    pipeline.on("end", () => {
      resolve(null);
    });

    pipeline.on("done", () => {
      resolve(null);
    });
    pipeline.on("finish", () => {
      resolve(null);
    });
  });
}

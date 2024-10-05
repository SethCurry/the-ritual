import { IpcMainEvent } from "electron";
import { DataSource } from "typeorm";
import IpcService from "../IpcService";
import {
  ListDecksServiceChannel,
  ScryfallBulkDataLoaderServiceChannel,
} from "../../../ipc/IpcServiceChannels";
import Deck from "../../data/db/models/Deck";

export interface ListDecksResponse {
  id: number;
  name: string;
}

export default class ListDecksService extends IpcService<
  {},
  ListDecksResponse[]
> {
  readonly channel: string;

  constructor(private readonly db: DataSource) {
    super();
    this.channel = ListDecksServiceChannel;
  }

  async onRequest(
    event: IpcMainEvent,
    request: {}
  ): Promise<ListDecksResponse[]> {
    const deckRepo = this.db.getRepository(Deck);

    const decks = await deckRepo.find();

    return decks.map((deck) => {
      return {
        id: deck.id,
        name: deck.name,
      };
    });
  }
}

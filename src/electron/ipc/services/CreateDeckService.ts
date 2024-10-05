import { IpcMainEvent } from "electron";
import { DataSource } from "typeorm";
import IpcService from "../IpcService";
import { CreateDeckServiceChannel } from "../../../ipc/IpcServiceChannels";
import Deck from "../../data/db/models/Deck";

export interface CreateDeckRequest {
  name: string;
}

export default class CreateDeckService extends IpcService<
  CreateDeckRequest,
  Deck
> {
  readonly channel: string;

  constructor(private readonly db: DataSource) {
    super();
    this.channel = CreateDeckServiceChannel;
  }

  async onRequest(
    event: IpcMainEvent,
    request: CreateDeckRequest
  ): Promise<Deck> {
    const deckRepo = this.db.getRepository(Deck);

    const deck = await deckRepo.create({
      name: request.name,
    });

    await deckRepo.save(deck);

    return deck;
  }
}

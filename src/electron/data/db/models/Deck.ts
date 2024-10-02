import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import DeckCard from "./DeckCard";

/** Deck stores an entire deck, including metadata such as the name. */
@Entity()
export default class Deck {
  /** The internal ID of the deck (i.e. not Moxfield/etc) */
  @PrimaryGeneratedColumn()
  public id: number;

  /** The name of the deck. */
  @Column("text")
  public name: string;

  /** The list of cards in the deck, which are linked to the printing. */
  @ManyToOne(() => DeckCard, (card) => card.deck)
  public cards: DeckCard[];
}

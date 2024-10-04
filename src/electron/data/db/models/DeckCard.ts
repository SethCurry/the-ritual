import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import Deck from "./Deck";
import Printing from "./Printing";

@Entity()
export default class DeckCard {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column("boolean")
  public maindeck: boolean;

  @Column("integer")
  public quantity: number;

  @ManyToOne(() => Deck, (deck) => deck.cards)
  public deck: Deck;

  @ManyToOne(() => Printing, (printing) => printing.deckCards)
  public printing: Printing;
}

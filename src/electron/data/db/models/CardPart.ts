import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import Card from "./Card";

export interface ScryfallCardPart {
  object: string;
  id: string;
  component: string;
  name: string;
  type_line: string;
  uri: string;
}

@Entity()
export default class CardPart {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column("text")
  public scryfallId: string;

  @Column("text")
  public component: string;

  @Column("text")
  public name: string;

  @Column("text")
  public typeLine: string;

  @Column("text")
  public uri: string;

  @ManyToOne(() => Card, (card) => card.parts)
  public card: Card;
}

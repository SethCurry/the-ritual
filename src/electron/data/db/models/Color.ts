import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from "typeorm";
import Card from "./Card";

@Entity()
export default class Color {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column("text")
  public name: string;

  @Column("text")
  public symbol: string;

  @ManyToMany(() => Card, (card) => card.colors)
  @JoinTable()
  public cards: Card[];

  @ManyToMany(() => Card, (card) => card.colorIdentity)
  @JoinTable()
  public cards_color_identity: Card[];
}

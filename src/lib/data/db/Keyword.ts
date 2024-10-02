import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from "typeorm";
import Card from "./Card";

@Entity()
export default class Keyword {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column("text")
  public name: string;

  @ManyToMany(() => Card, (card) => card.keywords)
  @JoinTable()
  public cards: Card[];
}

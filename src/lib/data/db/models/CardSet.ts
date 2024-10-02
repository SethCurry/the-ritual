import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import Printing from "./Printing";

@Entity()
export default class CardSet {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column("text")
  public name: string;

  @Column("text")
  public code: string;

  @OneToMany(() => Printing, (printing) => printing.set)
  public printings: Printing[];
}

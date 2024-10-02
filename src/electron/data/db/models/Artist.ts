import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import Card from "./Card";
import Printing from "./Printing";

@Entity()
export default class Artist {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column("text")
  public name: string;

  @OneToMany(() => Printing, (printing) => printing.artist)
  public printings: Printing[];
}

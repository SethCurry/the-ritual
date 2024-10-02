import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import Printing from "./Printing";

@Entity()
export default class Set {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column("text")
  public name: string;

  @Column("text")
  public code: string;

  @Column("boolean")
  public highresImage: boolean;

  @Column("boolean")
  public highresScan: boolean;

  @OneToMany(() => Printing, (printing) => printing.set)
  public printings: Printing[];
}

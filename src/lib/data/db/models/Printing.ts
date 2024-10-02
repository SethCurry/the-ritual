import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import Card from "./Card";
import Artist from "./Artist";
import CardSet from "./CardSet";

@Entity()
export default class Printing {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column("text")
  public imageUriSmall: string;

  @Column("text")
  public imageUriNormal: string;

  @Column("text")
  public imageUriLarge: string;

  @Column("text")
  public imageUriPng: string;

  @Column("text")
  public imageUriArtCrop: string;

  @Column("text")
  public imageUriBorderCrop: string;

  @Column("text")
  public pricesUsd: string;

  @Column("text")
  public pricesUsdFoil: string;

  @Column("text")
  public pricesUsdEtched: string;

  @Column("text")
  public rarity: string;

  @Column("text")
  public flavorText: string;

  @Column("text")
  public cardBackId: string;

  @Column("text")
  public illustrationId: string;

  @Column("text")
  public borderColor: string;

  @Column("text")
  public frame: string;

  @Column("text")
  public language: string;

  @Column("text")
  public collectorNumber: string;

  @Column("text")
  public uri: string;

  @Column("text")
  public scryfallUri: string;

  @Column("boolean")
  public foil: boolean;

  @Column("boolean")
  public nonfoil: boolean;

  @Column("boolean")
  public oversized: boolean;

  @Column("boolean")
  public promo: boolean;

  @Column("boolean")
  public reprint: boolean;

  @Column("boolean")
  public variation: boolean;

  @Column("boolean")
  public digital: boolean;

  @Column("boolean")
  public fullArt: boolean;

  @Column("boolean")
  public textless: boolean;

  @Column("boolean")
  public booster: boolean;

  @Column("boolean")
  public storySpotlight: boolean;

  @Column("integer")
  public mtgoId: number;

  @Column("integer")
  public mtgoFoilId: number;

  @Column("integer")
  public tcgplayerId: number;

  @Column("integer")
  public cardmarketId: number;

  @ManyToOne(() => CardSet, (set) => set.printings)
  public set: CardSet;

  @ManyToOne(() => Card, (card) => card.printings)
  public card: Card;

  @ManyToOne(() => Artist, (artist) => artist.printings)
  public artist: Artist;
}

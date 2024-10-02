import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  OneToMany,
} from "typeorm";
import Keyword from "./Keyword";
import Color from "./Color";
import CardPart from "./CardPart";

@Entity()
export default class Card {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column("text")
  public name: string;

  @Column("text")
  public oracleId: string;

  @Column("text")
  public rarity: string;

  @Column("text")
  public flavorText: string;

  @Column("text")
  public cardBackId: string;

  @Column("text")
  public artist: string;

  @Column("text")
  public illustrationId: string;

  @Column("text")
  public borderColor: string;

  @Column("text")
  public frame: string;

  @Column("text")
  public language: string;

  @Column("text")
  public setId: string;

  @Column("text")
  public setCode: string;

  @Column("text")
  public setName: string;

  @Column("text")
  public setType: string;

  @Column("text")
  public setUri: string;

  @Column("text")
  public setSearchUri: string;

  @Column("text")
  public scryfallSetUri: string;

  @Column("text")
  public rulingsUri: string;

  @Column("text")
  public printsSearchUri: string;

  @Column("text")
  public collectorNumber: string;

  @Column("text")
  public uri: string;

  @Column("text")
  public scryfallUri: string;

  @Column("text")
  public layout: string;

  @Column("text")
  public manaCost: string;

  @Column("text")
  public typeLine: string;

  @Column("text")
  public oracleText: string;

  @Column("text")
  public power: string;

  @Column("text")
  public toughness: string;

  @Column("text")
  public loyalty: string;

  @Column("boolean")
  public highresImage: boolean;

  @Column("boolean")
  public highresScan: boolean;

  @Column("boolean")
  public reserved: boolean;

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

  @Column("float")
  public cmc: number;

  @Column("integer")
  public mtgoId: number;

  @Column("integer")
  public mtgoFoilId: number;

  @Column("integer")
  public tcgplayerId: number;

  @Column("integer")
  public cardmarketId: number;

  @Column("integer")
  public edhrecRank: number;

  @Column("integer")
  public pennyRank: number;

  @Column("text")
  public releasedAt: string;

  @Column("text")
  public gathererUrl: string;

  @Column("text")
  public tcgplayerInfiniteArticlesUrl: string;

  @Column("text")
  public tcgplayerInfiniteDecksUrl: string;

  @Column("text")
  public edhrecUrl: string;

  @Column("text")
  public mtgtop8Url: string;

  @Column("text")
  public pricesUsd: string;

  @Column("text")
  public pricesUsdFoil: string;

  @Column("text")
  public pricesUsdEtched: string;

  @Column("text")
  public legalityStandard: string;

  @Column("text")
  public legalityFuture: string;

  @Column("text")
  public legalityHistoric: string;

  @Column("text")
  public legalityGladiator: string;

  @Column("text")
  public legalityPioneer: string;

  @Column("text")
  public legalityExplorer: string;

  @Column("text")
  public legalityModern: string;

  @Column("text")
  public legalityLegacy: string;

  @Column("text")
  public legalityPauper: string;

  @Column("text")
  public legalityVintage: string;

  @Column("text")
  public legalityPenny: string;

  @Column("text")
  public legalityCommander: string;

  @Column("text")
  public legalityOathbreaker: string;

  @Column("text")
  public legalityBrawl: string;

  @Column("text")
  public legalityHistoricBrawl: string;

  @Column("text")
  public legalityAlchemy: string;

  @Column("text")
  public legalityPauperCommander: string;

  @Column("text")
  public legalityDuel: string;

  @Column("text")
  public legalityOldschool: string;

  @Column("text")
  public legalityPremodern: string;

  @Column("text")
  public legalityPredh: string;

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

  @ManyToMany(() => Keyword, (keyword) => keyword.cards)
  public keywords: Keyword[];

  @ManyToMany(() => Color, (color) => color.cards)
  public colors: Color[];

  @ManyToMany(() => Color, (color) => color.cards_color_identity)
  public colorIdentity: Color[];

  @OneToMany(() => CardPart, (cardPart) => cardPart.card)
  public parts: CardPart[];
}

import {
  Entity,
  Column,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import Keyword from "./Keyword";
import Color from "./Color";
import CardPart from "./CardPart";
import Printing from "./Printing";

@Entity()
export default class Card {
  @PrimaryGeneratedColumn()
  public id: number;

  /**
   * The ID that Scryfall uses to refer to this card.
   */
  @Column("text")
  public scryfallId: string;

  /**
   * The name of the card.  For dual-sided/faced cards,
   * this will be formatted as "Card 1 // Card 2".
   */
  @Column("text")
  public name: string;

  @Column("text")
  public oracleId: string;

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
  public reserved: boolean;

  @Column("float")
  public cmc: number;

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

  @OneToMany(() => Printing, (printing) => printing.card)
  public printings: Printing[];

  @ManyToMany(() => Keyword, (keyword) => keyword.cards)
  public keywords: Keyword[];

  @ManyToMany(() => Color, (color) => color.cards)
  public colors: Color[];

  @ManyToMany(() => Color, (color) => color.cards_color_identity)
  public colorIdentity: Color[];

  @OneToMany(() => CardPart, (cardPart) => cardPart.card)
  public parts: CardPart[];
}

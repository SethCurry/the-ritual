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

  @Column("text", { nullable: true })
  public oracleId?: string | null;

  @Column("text")
  public layout: string;

  @Column("text", { nullable: true })
  public manaCost: string | null;

  @Column("text")
  public typeLine: string;

  @Column("text", { nullable: true })
  public oracleText: string | null;

  @Column("text", { nullable: true })
  public power: string | null;

  @Column("text", { nullable: true })
  public toughness: string | null;

  @Column("text", { nullable: true })
  public loyalty: string | null;

  @Column("boolean")
  public reserved: boolean;

  @Column("float")
  public cmc: number;

  @Column("integer", { nullable: true })
  public edhrecRank: number | null;

  @Column("integer", { nullable: true })
  public pennyRank: number | null;

  @Column("text")
  public releasedAt: string;

  @Column("text", { nullable: true })
  public legalityStandard: string | null;

  @Column("text", { nullable: true })
  public legalityFuture: string | null;

  @Column("text", { nullable: true })
  public legalityHistoric: string | null;

  @Column("text", { nullable: true })
  public legalityGladiator: string | null;

  @Column("text", { nullable: true })
  public legalityPioneer: string | null;

  @Column("text", { nullable: true })
  public legalityExplorer: string | null;

  @Column("text", { nullable: true })
  public legalityModern: string | null;

  @Column("text", { nullable: true })
  public legalityLegacy: string | null;

  @Column("text", { nullable: true })
  public legalityPauper: string | null;

  @Column("text", { nullable: true })
  public legalityVintage: string | null;

  @Column("text", { nullable: true })
  public legalityPenny: string | null;

  @Column("text", { nullable: true })
  public legalityCommander: string | null;

  @Column("text", { nullable: true })
  public legalityOathbreaker: string | null;

  @Column("text", { nullable: true })
  public legalityBrawl: string | null;

  @Column("text", { nullable: true })
  public legalityHistoricBrawl: string | null;

  @Column("text", { nullable: true })
  public legalityAlchemy: string | null;

  @Column("text", { nullable: true })
  public legalityPauperCommander: string | null;

  @Column("text", { nullable: true })
  public legalityDuel: string | null;

  @Column("text", { nullable: true })
  public legalityOldschool: string | null;

  @Column("text", { nullable: true })
  public legalityPremodern: string | null;

  @Column("text", { nullable: true })
  public legalityPredh: string | null;

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

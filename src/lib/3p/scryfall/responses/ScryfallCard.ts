import Rarity from "../../../mtg/Rarity";
import Legality from "../../../mtg/Legality";

/**
 * A card returned from the Scryfall API or bulk files.
 */
export default interface ScryfallCard {
  /**
   * Scryfall's unique identifier for the card.
   */
  id: string;

  /**
   * The name of the card.  Double-faced cards will have the two names separated by " // ".
   */
  name: string;

  /**
   * Wizards' Oracle ID for the card.
   */
  oracle_id?: string;

  /**
   * The card's rarity.  One of: "common", "uncommon", "rare", "mythic".
   */
  rarity: Rarity;

  /**
   * The flavor text printed on the card.
   */
  flavor_text: string;

  /**
   * The identifier for the pattern on the card's back.
   */
  card_back_id: string;

  /**
   * The name of the artist who illustrated the card.
   */
  artist: string;
  illustration_id: string;
  border_color: string;
  frame: string;
  language: string;
  set_id: string;
  set: string;
  set_name: string;
  set_type: string;
  set_uri: string;
  set_search_uri: string;
  scryfall_set_uri: string;
  rulings_uri: string;
  prints_search_uri: string;
  collector_number: string;
  uri: string;
  scryfall_uri: string;
  layout: string;
  mana_cost: string;
  type_line: string;
  oracle_text?: string;
  power?: string;
  toughness?: string;
  loyalty?: string;

  highres_image: boolean;
  highres_scan: boolean;
  reserved: boolean;
  foil: boolean;
  nonfoil: boolean;
  oversized: boolean;
  promo: boolean;
  reprint: boolean;
  variation: boolean;
  digital: boolean;
  full_art: boolean;
  textless: boolean;
  booster: boolean;
  story_spotlight: boolean;

  /**
   * The card's converted mana cost.
   * Note that this can be a decimal, for Un sets.
   */
  cmc: number;
  arena_id?: number;
  mtgo_id?: number;
  mtgo_foil_id?: number;
  tcgplayer_id: number;
  cardmarket_id: number;
  edhrec_rank: number;
  penny_rank: number;
  multiverse_ids: number[];
  colors: string[];
  color_identity: string[];
  keywords: string[];
  games: string[];
  finishes: string[];
  artist_ids: string[];
  released_at: string;

  image_uris: ScryfallCardImageURIs;
  related_uris: ScryfallCardRelatedURIs;
  prices: ScryfallCardPrices;
  legalities: ScryfallCardLegality;
  all_parts: ScryfallCardPart[];
}

export interface ScryfallCardRelatedURIs {
  gatherer: string;
  tcgplayer_infinite_articles: string;
  tcgplayer_infinite_decks: string;
  edhrec: string;
  mtgtop8: string;
}

export interface ScryfallCardPrices {
  usd: string;
  usd_foil: string;
  usd_etched: string;
}

export interface ScryfallCardPart {
  object: string;
  id: string;
  component: string;
  name: string;
  type_line: string;
  uri: string;
}

export interface ScryfallCardLegality {
  standard: Legality;
  future: Legality;
  historic: Legality;
  gladiator: Legality;
  pioneer: Legality;
  explorer: Legality;
  modern: Legality;
  legacy: Legality;
  pauper: Legality;
  vintage: Legality;
  penny: Legality;
  commander: Legality;
  oathbreaker: Legality;
  brawl: Legality;
  historicbrawl: Legality;
  alchemy: Legality;
  paupercommander: Legality;
  duel: Legality;
  oldschool: Legality;
  premodern: Legality;
  predh: Legality;
}

export interface ScryfallCardImageURIs {
  small: string;
  normal: string;
  large: string;
  png: string;
  art_crop: string;
  border_crop: string;
}

export type ScryfallBulkDataType =
  | "oracle_cards"
  | "default_cards"
  | "unique_artwork"
  | "all_cards"
  | "rulings";

export default interface ScryfallBulkData {
  id: string;
  type: ScryfallBulkDataType;
  updated_at: string;
  uri: string;
  name: string;
  description: string;
  size: number;
  download_uri: string;
  content_type: string;
  content_encoding: string;
}

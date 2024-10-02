/**
 * A list of objects returned from the Scryfall API.
 * Scryfall uses this pattern for all of its paginated endpoints.
 */
export default interface ScryfallList<T> {
  has_more: boolean;
  next_page: string | null;
  data: T[];
}

export interface DeckCard {
  name: string;
  count: number;
  collectorNumber?: string;
  setCode?: string;
}

export interface DeckList {
  maindeck: DeckCard[];
  sideboard?: DeckCard[];
}

export function parseMtgoDeckList(deckList: string): DeckList {
  const lines = deckList.split("\n");

  var inSideboard = false;

  const maindeck: DeckCard[] = [];
  const sideboard: DeckCard[] = [];

  for (const line of lines) {
    if (line === "") {
      inSideboard = true;
      continue;
    }

    const parts = line.trim().split(" ");

    const count = parseInt(parts[0]);
    const name = parts.slice(1).join(" ");

    if (inSideboard) {
      sideboard.push({ name, count });
    } else {
      maindeck.push({ name, count });
    }
  }

  return { maindeck, sideboard };
}

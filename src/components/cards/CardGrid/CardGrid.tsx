import Flex from "antd/es/flex";
import ScryfallCard from "../../../lib/mtg/scryfall/responses/ScryfallCard";
import CardRow from "./CardRow";

export interface CardGridProps {
  cards: ScryfallCard[];
  cardsPerRow: number;
  onScroll?: React.UIEventHandler<HTMLElement>;
}

export default function CardGrid({
  cards,
  cardsPerRow,
  onScroll,
}: CardGridProps) {
  const groups: ScryfallCard[][] = [];

  var collector: ScryfallCard[] = [];

  cards.forEach((card) => {
    collector.push(card);
    if (collector.length === cardsPerRow) {
      const clonedArray: ScryfallCard[] = [];

      collector.forEach((val) => clonedArray.push(Object.assign({}, val)));

      groups.push(clonedArray);

      collector = [];
    }
  });

  return (
    <Flex
      vertical
      style={{ overflowY: "scroll", height: "85vh", width: "100%" }}
      gap="small"
      onScroll={onScroll}
    >
      {groups.map((group, idx) => (
        <CardRow key={idx} cards={group} />
      ))}
    </Flex>
  );
}

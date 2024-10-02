import Flex from "antd/es/flex";
import ScryfallCard from "../../../lib/mtg/scryfall/responses/ScryfallCard";
import CardItem from "./CardItem";

export interface CardRowProps {
  cards: ScryfallCard[];
}

export default function CardRow({ cards }: CardRowProps) {
  return (
    <Flex gap="small" style={{ width: "100%" }}>
      {cards.map((card, idx) => {
        return <CardItem key={idx} card={card} />;
      })}
    </Flex>
  );
}

import Input from "antd/es/input/Input";
import DefaultLayout from "../layouts/DefaultLayout";
import { useState } from "react";
import { Button, Divider, Flex } from "antd";
import { scryfallClient } from "../state/Scryfall";
import ScryfallCard from "../../lib/mtg/3p/scryfall/responses/ScryfallCard";
import CardGrid from "../components/cards/CardGrid/CardGrid";
import ScryfallPager from "../../lib/mtg/3p/scryfall/ScryfallPager";

export default function ScryfallSearchRoute() {
  const [userQuery, setUserQuery] = useState("");
  const [foundCards, setFoundCards] = useState<ScryfallCard[]>([]);
  const [pager, setPager] = useState<ScryfallPager<ScryfallCard> | null>(null);

  const handleSearch = async () => {
    console.log("searching for", userQuery);

    const newPager = scryfallClient.cards.search(userQuery);

    const newCards = await newPager.next();
    console.log("setting cards", newCards);

    setFoundCards(newCards);
    setPager(newPager);
  };

  const loadMoreCards = async () => {
    const newCards = await scryfallClient.cards.search(userQuery).next();

    setFoundCards((prevCards) => [...prevCards, ...newCards]);
  };

  const handleScroll = async (e: React.UIEvent<HTMLDivElement>) => {
    const div = e.currentTarget;
    if (
      pager !== null &&
      div.scrollHeight - div.scrollTop === div.clientHeight
    ) {
      await loadMoreCards();
    }
  };

  return (
    <DefaultLayout>
      <Flex vertical style={{ width: "100%", height: "100%" }}>
        Search for cards on Scryfall
        <Flex>
          <Input
            placeholder="Search for cards"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
            onChange={(e) => setUserQuery(e.target.value)}
            value={userQuery}
          />
          <Button
            type="primary"
            onClick={() => {
              handleSearch();
            }}
          >
            Search
          </Button>
        </Flex>
        <Divider />
        <CardGrid cards={foundCards} cardsPerRow={5} onScroll={handleScroll} />
      </Flex>
    </DefaultLayout>
  );
}

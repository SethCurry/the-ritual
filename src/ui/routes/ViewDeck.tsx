import React, { useEffect, useState } from "react";

import { useSearchParams } from "react-router-dom";
import { getRpc } from "../util";
import DefaultLayout from "../layouts/DefaultLayout";
import { GetDeckByIdResponse } from "../../electron/rpc/models/DeckModels";
import Table from "antd/es/table/Table";
import { ColumnsType } from "antd/es/table";
import { DeckCard } from "../../lib/mtg/decklist/DeckList";

export default function ViewDeck() {
  const [searchParams] = useSearchParams();

  const [deck, setDeck] = useState<GetDeckByIdResponse | null>(null);

  const rpc = getRpc();

  useEffect(() => {
    console.log("updating deck");
    const deckIdStr = searchParams.get("id");

    if (!deckIdStr) {
      console.log("no deck id");
      return;
    }

    const deckId = parseInt(deckIdStr);
    if (isNaN(deckId)) {
      console.log("invalid deck id", deckIdStr);
    }

    console.log("getting deck", deckId);

    rpc.getDeckById({ id: deckId }).then((gotDeck) => {
      console.log("got deck", gotDeck);
      setDeck(gotDeck);
    });
  }, [searchParams]);

  if (!deck) {
    return (
      <DefaultLayout>
        <div>Loading...</div>
      </DefaultLayout>
    );
  }

  const columns: ColumnsType<DeckCard> = [
    {
      title: "Name",
      dataIndex: "name",
    },
  ];

  return (
    <DefaultLayout>
      <h2>{deck.name}</h2>
      <Table
        dataSource={deck.deckList.maindeck}
        rowKey={(crd) => crd.name}
        columns={columns}
      />
    </DefaultLayout>
  );
}

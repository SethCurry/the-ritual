import Button from "antd/es/button/button";
import DefaultLayout from "../layouts/DefaultLayout";
import React, { useEffect, useState } from "react";
import { Input, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { ListDecksItem, ListDecksResponse } from "../../electron/rpc/types";
import { getRpc } from "../util";
import { Link } from "react-router-dom";

export default function ListDecks() {
  const [decks, setDecks] = useState<ListDecksItem[]>([]);
  const [idMap, setIdMap] = useState<Map<string, number>>();

  const rpc = getRpc();

  useEffect(() => {
    rpc.listDecks({}).then((newDecks: ListDecksResponse) => {
      console.log("listDecks", newDecks);
      setDecks(newDecks.decks);
      setIdMap(new Map(newDecks.decks.map((deck) => [deck.name, deck.id])));
    });
  }, [setDecks]);

  const [newDeckName, setNewDeckName] = useState("");

  const columns: ColumnsType<ListDecksItem> = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text: string) => (
        <Link to={`/decks/view?id=${idMap?.get(text)}`}>{text}</Link>
      ),
    },
  ];

  return (
    <DefaultLayout>
      <h2>Decks</h2>
      <span style={{ width: "100%Window & typeof globalThis" }}>
        <Input
          value={newDeckName}
          onChange={(e) => setNewDeckName(e.target.value)}
          style={{ width: "25%" }}
        />
        <Button
          onClick={async () => await rpc.createDeck({ name: newDeckName })}
        >
          New Deck
        </Button>
      </span>
      <Table dataSource={decks} rowKey={(deck) => deck.id} columns={columns} />
    </DefaultLayout>
  );
}

import Button from "antd/es/button/button";
import DefaultLayout from "../layouts/DefaultLayout";
import React, { useEffect, useState } from "react";
import { Input, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { ListDecksItem, ListDecksResponse } from "../../electron/rpc/types";

export default function ListDecks() {
  const [decks, setDecks] = useState<ListDecksItem[]>([]);
  const columns: ColumnsType<ListDecksItem> = [
    {
      title: "Name",
      dataIndex: "name",
    },
  ];

  useEffect(() => {
    window.rpc.listDecks().then((newDecks: ListDecksResponse) => {
      console.log("listDecks", newDecks);
      setDecks(newDecks.decks);
    });
  }, [setDecks]);

  const [newDeckName, setNewDeckName] = useState("");

  return (
    <DefaultLayout>
      <h2>Decks</h2>
      <span style={{ width: "100%" }}>
        <Input
          value={newDeckName}
          onChange={(e) => setNewDeckName(e.target.value)}
          style={{ width: "25%" }}
        />
        <Button onClick={async () => await window.rpc.createDeck(newDeckName)}>
          New Deck
        </Button>
      </span>
      <Table dataSource={decks} rowKey={(deck) => deck.id} columns={columns} />
    </DefaultLayout>
  );
}

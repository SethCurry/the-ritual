import Button from "antd/es/button/button";
import DefaultLayout from "../layouts/DefaultLayout";
import Deck from "../../electron/data/db/models/Deck";
import { useEffect, useState } from "react";
import { Input, Table } from "antd";
import { ColumnsType } from "antd/es/table";

export default function ListDecks() {
  const [decks, setDecks] = useState<Deck[]>([]);
  const columns: ColumnsType<Deck> = [
    {
      title: "Name",
      dataIndex: "name",
    },
  ];

  useEffect(() => {
    window.ritual.listDecks().then((newDecks: Deck[]) => {
      setDecks(newDecks);
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
        <Button
          onClick={async () => await window.ritual.createDeck(newDeckName)}
        >
          New Deck
        </Button>
      </span>
      <Table dataSource={decks} rowKey={(deck) => deck.id} columns={columns} />
    </DefaultLayout>
  );
}

import Button from "antd/es/button/button";
import DefaultLayout from "../layouts/DefaultLayout";
import React from "react";
import { getRpc } from "../util";

export default function AdminOverview() {
  const rpc = getRpc();

  const loadData = async () => {
    rpc.scryfallBulkDataLoader({}).then((files: string[]) => {
      console.log(files);
    });
  };

  return (
    <DefaultLayout>
      <p>Welcome to the admin page!</p>
      <Button onClick={loadData}>Load Data</Button>
    </DefaultLayout>
  );
}

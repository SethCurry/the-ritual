import Button from "antd/es/button/button";
import DefaultLayout from "../layouts/DefaultLayout";
import React from "react";

export default function AdminOverview() {
  const loadData = async () => {
    window.rpc.scryfallBulkDataLoader().then((files: string[]) => {
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

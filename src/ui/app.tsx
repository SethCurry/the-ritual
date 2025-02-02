import * as React from "react";
import { createRoot } from "react-dom/client";
import { createHashRouter, RouterProvider } from "react-router-dom";
import Home from "./routes/Home";
import "./index.css";
import ScryfallSearchRoute from "./routes/ScryfallSearchRoute";
import AdminOverview from "./routes/AdminOverview";
import ListDecks from "./routes/ListDecks";
import ViewDeck from "./routes/ViewDeck";

const router = createHashRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/admin",
    element: <AdminOverview />,
  },
  {
    path: "/decks",
    element: <ListDecks />,
  },
  {
    path: "/decks/view",
    element: <ViewDeck />,
  },
  {
    path: "/scryfall/search",
    element: <ScryfallSearchRoute />,
  },
]);

const appRoot = document.getElementById("app");

if (!appRoot) {
  throw new Error("No app root found");
}

const root = createRoot(appRoot);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

import * as React from "react";
import { createRoot } from "react-dom/client";
import { createHashRouter, RouterProvider } from "react-router-dom";
import Home from "./routes/Home";
import "./index.css";
import ScryfallSearchRoute from "./routes/ScryfallSearchRoute";
import AdminOverview from "./routes/AdminOverview";

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
    path: "/scryfall/search",
    element: <ScryfallSearchRoute />,
  },
]);

const appRoot = document.getElementById("app");

const root = createRoot(appRoot);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

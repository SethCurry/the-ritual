import "reflect-metadata";
import { app, BrowserWindow, ipcMain } from "electron";
import { DataSource } from "typeorm";
import Card from "./data/db/models/Card";
import CardPart from "./data/db/models/CardPart";
import Color from "./data/db/models/Color";
import Keyword from "./data/db/models/Keyword";
import Artist from "./data/db/models/Artist";
import Deck from "./data/db/models/Deck";
import DeckCard from "./data/db/models/DeckCard";
import Printing from "./data/db/models/Printing";
import CardSet from "./data/db/models/CardSet";
import { RpcServer, TRpcHandlers } from "./rpc/RpcServer";
import {
  createCreateDeckHandler,
  createListDecksHandler,
} from "./rpc/handlers/decks";
import { createScryfallBulkDataLoaderHandler } from "./rpc/handlers/ScryfallBulkDataLoaderService";
import { getDeckByIdHandler } from "./rpc/handlers/decks";

// This allows TypeScript to pick up the magic constants that's auto-generated by Forge's Webpack
// plugin that tells the Electron app where to look for the Webpack-bundled app code (depending on
// whether you're running in development or production).
declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

const AppDataSource = new DataSource({
  type: "sqlite",
  database: "database.sqlite",
  entities: [
    Artist,
    Card,
    CardPart,
    CardSet,
    Color,
    Deck,
    DeckCard,
    Keyword,
    Printing,
  ],
  synchronize: true,
  logging: true,
});

AppDataSource.initialize().then(() => {
  console.log("Data Source has been initialized!");
});

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  app.quit();
}

const createWindow = (): void => {
  const handlers: TRpcHandlers = {
    listDecks: createListDecksHandler(AppDataSource),
    createDeck: createCreateDeckHandler(AppDataSource),
    scryfallBulkDataLoader: createScryfallBulkDataLoaderHandler(AppDataSource),
    getDeckById: getDeckByIdHandler(AppDataSource),
  };

  const rpcServer = new RpcServer(ipcMain, handlers);

  rpcServer.registerHandlers();

  // Create the browser window.
  const mainWindow = new BrowserWindow({
    fullscreen: false,
    maximizable: true,
    minimizable: true,
    movable: true,
    thickFrame: false,
    useContentSize: true,
    title: "The Ritual - MTG Toolbox",
    icon: "./assets/icons/icon-512.png",
    modal: false,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  });

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

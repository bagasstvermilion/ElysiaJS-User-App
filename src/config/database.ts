import * as sqlite3 from "sqlite3";
import { open } from "sqlite";
import * as dotenv from "dotenv";

dotenv.config();

let isConnected = false;

export const openDb = async () => {
  try {
    if (!isConnected) {
      const db = await open({
        filename: "./database.db",
        driver: sqlite3.Database,
      });

      console.log("Connected to the Elysia database.");

      await db.exec(`
        CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          age INTEGER NOT NULL
        )
      `);

      isConnected = true;
    }

    return await open({
      filename: process.env.DB_FILENAME || "./database.db",
      driver: sqlite3.Database,
    });
  } catch (error) {
    console.error("Failed to connect to the database:", error);
    throw error;
  }
};

import sqlite3 from "sqlite3";
import { open } from "sqlite";

export const openDb = async () => {
  try {
    const db = await open({
      filename: "./database.db",
      driver: sqlite3.Database,
    });

    console.log("Connected to the SQLite database.");

    await db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        age INTEGER NOT NULL
      )
    `);

    console.log("Table 'users' is ready.");
    return db;
  } catch (error) {
    console.error("Failed to connect to the database:", error);
    throw error;
  }
};

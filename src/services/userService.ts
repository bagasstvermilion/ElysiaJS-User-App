import { open } from "sqlite";
import sqlite3 from "sqlite3";

const dbPromise = open({
  filename: "./database.db",
  driver: sqlite3.Database,
});

export async function getUsers() {
  const db = await dbPromise;
  return db.all("SELECT * FROM users");
}

export async function addUser(name: string, age: number) {
  const db = await dbPromise;
  await db.run("INSERT INTO users (name, age) VALUES (?, ?)", [name, age]);
}

export async function deleteUser(id: number) {
  const db = await dbPromise;
  await db.run("DELETE FROM users WHERE id = ?", [id]);
}

(async () => {
  const db = await dbPromise;
  await db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      age INTEGER
    )
  `);
})();

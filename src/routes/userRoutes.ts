import express from "express";
import { openDb } from "../config/database";
import * as dotenv from "dotenv";

dotenv.config();

const router = express.Router();

router.post("/add-user", async (req, res) => {
  const { name, age } = req.body;
  const db = await openDb();

  const result = await db.run("INSERT INTO users (name, age) VALUES (?, ?)", [
    name,
    age,
  ]);

  res.json({
    message: "User added successfully!",
    id: result.lastID,
  });
});

router.get("/users", async (req, res) => {
  const db = await openDb();
  const users = await db.all("SELECT * FROM users");
  res.json(users);
});

router.delete("/delete-user/:id", async (req, res) => {
  const { id } = req.params;
  const db = await openDb();

  await db.run("DELETE FROM users WHERE id = ?", [id]);

  res.json({
    message: "User deleted successfully!",
  });
});

export default router;

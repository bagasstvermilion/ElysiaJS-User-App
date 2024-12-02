import express from "express";
import { openDb } from "../config/database";

const router = express.Router();

<<<<<<< HEAD
router.post("/add-user", async (req, res) => {
  const { name, age } = req.body;
  const db = await openDb();

  const result = await db.run("INSERT INTO users (name, age) VALUES (?, ?)", [
    name,
    age,
  ]);

  res.json({
    message: "User added successfully",
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
=======
router.get("/data", (req, res) => {
  res.json(users);
});

router.post("/data", (req, res) => {
  const { name, age } = req.body;
  if (!name || !age) {
    return res.status(400).json({ error: "Name and age are required" });
  }
>>>>>>> a93d26a11cec12a9cc969ee48ebb9b6ebec8855b

  await db.run("DELETE FROM users WHERE id = ?", [id]);

  res.json({
    message: "User deleted successfully",
  });
});

export default router;

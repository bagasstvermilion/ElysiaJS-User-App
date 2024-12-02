import express from "express";
import bodyParser from "body-parser";
import { openDb } from "./config/database";
import path from "path";

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, "../public")));
app.use(bodyParser.json());

app.get("/users", async (req, res) => {
  try {
    const db = await openDb();
    const rows = await db.all("SELECT * FROM users ORDER BY id DESC");
    res.json(rows);
  } catch (error) {
    console.error("Error retrieving users:", error);
    res.status(500).json({ message: "Failed to retrieve users" });
  }
});

app.post("/users", async (req, res) => {
  const { name, age } = req.body;

  if (!name || !age) {
    return res.status(400).json({ message: "Name and age are required" });
  }

  try {
    const db = await openDb();
    await db.run("INSERT INTO users (name, age) VALUES (?, ?)", [name, age]);
    const rows = await db.all("SELECT * FROM users ORDER BY id DESC");
    res.status(201).json(rows);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Failed to create user" });
  }
});

app.delete("/users/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const db = await openDb();
    const result = await db.run("DELETE FROM users WHERE id = ?", [id]);

    if (result.changes === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const rows = await db.all("SELECT * FROM users ORDER BY id DESC");
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Failed to delete user" });
  }
});

app.put("/users/:id", async (req, res) => {
  const { id } = req.params;
  const { name, age } = req.body;

  if (!name || !age) {
    return res.status(400).json({ message: "Name and age are required" });
  }

  try {
    const db = await openDb();
    const result = await db.run(
      "UPDATE users SET name = ?, age = ? WHERE id = ?",
      [name, age, id]
    );

    if (result.changes === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const rows = await db.all("SELECT * FROM users ORDER BY id DESC");
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Failed to update user" });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

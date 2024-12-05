import express = require("express");
import bodyParser = require("body-parser");
import { openDb } from "./config/database";
import * as path from "path";
import * as dotenv from "dotenv";
import * as XLSX from "xlsx";
import PDFDocument from "pdfkit";

dotenv.config();

const app = express();
const port = process.env.APP_PORT || 3000;

app.use(express.static(path.join(__dirname, "../public")));
app.use(bodyParser.json());

app.get("/users", async (req, res) => {
  try {
    const db = await openDb();
    const rows = await db.all("SELECT * FROM users ORDER BY id DESC");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve users" });
  }
});

app.post("/users", async (req, res) => {
  const { name, age } = req.body;
  if (!name || !age)
    return res.status(400).json({ message: "Name and age are required" });
  try {
    const db = await openDb();
    await db.run("INSERT INTO users (name, age) VALUES (?, ?)", [name, age]);
    const rows = await db.all("SELECT * FROM users ORDER BY id DESC");
    res.status(201).json(rows);
  } catch (error) {
    res.status(500).json({ message: "Failed to create user" });
  }
});

app.delete("/users/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const db = await openDb();
    const result = await db.run("DELETE FROM users WHERE id = ?", [id]);
    if (result.changes === 0)
      return res.status(404).json({ message: "User not found" });
    const rows = await db.all("SELECT * FROM users ORDER BY id DESC");
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ message: "Failed to delete user" });
  }
});

app.put("/users/:id", async (req, res) => {
  const { id } = req.params;
  const { name, age } = req.body;
  if (!name || !age)
    return res.status(400).json({ message: "Name and age are required" });
  try {
    const db = await openDb();
    const result = await db.run(
      "UPDATE users SET name = ?, age = ? WHERE id = ?",
      [name, age, id]
    );
    if (result.changes === 0)
      return res.status(404).json({ message: "User not found" });
    const rows = await db.all("SELECT * FROM users ORDER BY id DESC");
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ message: "Failed to update user" });
  }
});

app.get("/export/excel", async (req, res) => {
  try {
    const db = await openDb();
    const users = await db.all("SELECT * FROM users");
    const worksheet = XLSX.utils.json_to_sheet(users);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Users");
    const buffer = XLSX.write(workbook, { bookType: "xlsx", type: "buffer" });
    res.setHeader("Content-Disposition", "attachment; filename=users.xlsx");
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.send(buffer);
  } catch (error) {
    res.status(500).json({ message: "Failed to export data to Excel" });
  }
});

app.get("/export/pdf", async (req, res) => {
  try {
    const db = await openDb();
    const users = await db.all("SELECT * FROM users");
    const doc = new PDFDocument();
    res.setHeader("Content-Disposition", "attachment; filename=users.pdf");
    res.setHeader("Content-Type", "application/pdf");
    doc.pipe(res);
    doc.fontSize(16).text("User List", { align: "center" });
    doc.moveDown();
    users.forEach((user, index) => {
      doc.text(`${index + 1}. Name: ${user.name}, Age: ${user.age}`);
    });
    doc.end();
  } catch (error) {
    res.status(500).json({ message: "Failed to export data to PDF" });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

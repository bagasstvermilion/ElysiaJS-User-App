import { Router } from "express";

const router = Router();
let users: { name: string; age: number }[] = [];

// GET: Retrieve all users
router.get("/data", (req, res) => {
  res.json(users);
});

// POST: Add new user
router.post("/data", (req, res) => {
  const { name, age } = req.body;
  if (!name || !age) {
    return res.status(400).json({ error: "Name and age are required" });
  }

  const newUser = { name, age: Number(age) };
  users.push(newUser);
  res.json(newUser);
});

export default router;

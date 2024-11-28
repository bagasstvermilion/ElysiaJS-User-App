import express, { Request, Response } from "express";
import path from "path";

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));

app.get("/", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

app.post("/data", (req: Request, res: Response) => {
  const { name, age } = req.body;
  res.json({ name, age });
});

app.delete("/data/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({ message: `Data with ID ${id} deleted` });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

import express, { Request, Response } from "express";
import bodyParser from "body-parser";

const app = express();

app.use(bodyParser.json());

app.use(express.static("public"));

app.post("/data", (req: Request, res: Response) => {
  const { name, age } = req.body;

  res.json({ name, age });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

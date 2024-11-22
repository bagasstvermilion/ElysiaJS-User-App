import { Router } from "express";
import { getUsers } from "../controllers/dataController";

const router = Router();

router.get("/", getUsers);

export default router;

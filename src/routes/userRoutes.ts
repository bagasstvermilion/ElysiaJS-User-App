import { Router } from "express";
import { getUsers } from "../controllers/dataController"; // Pastikan ini sesuai dengan controller Anda

const router = Router();

router.get("/", getUsers);

export default router;

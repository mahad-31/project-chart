import express from "express";
import { createEmotion, getAllEmotions } from "../controllers/emotion.controller";

const router = express.Router();

router.post("/", createEmotion);
router.get("/", getAllEmotions);

export default router;

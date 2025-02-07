import express from "express";
import {
  createTraffic,
  getAllTraffic,
  getTrafficById,
  updateTraffic,
  deleteTraffic,
} from "../controllers/traffic.controller";

const router = express.Router();

// CRUD routes
router.post("/", createTraffic);
router.get("/", getAllTraffic);
router.get("/:id", getTrafficById);
router.put("/:id", updateTraffic);
router.delete("/:id", deleteTraffic);

export default router;

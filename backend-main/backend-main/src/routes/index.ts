import express from "express";
import userRoutes from "./user.routes";
import trafficRoutes from "./traffic.routes";
import emotionRoutes from "./emotion.routes";
import personRoutes from "./person.routes";

const router = express.Router();

router.use("/users", userRoutes);
router.use("/traffic", trafficRoutes);
router.use("/emotions", emotionRoutes);
router.use("/persons", personRoutes);

export default router;

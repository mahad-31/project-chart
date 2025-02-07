import express, { Router } from "express";
import {
  createPerson,
  getAllPersons,
  getPersonByModelId,
  updatePerson,
  deletePerson,
} from "../controllers/person.controller";

const router: Router = express.Router();

router.post("/", createPerson);
router.get("/", getAllPersons);
router.get("/:modelId", getPersonByModelId);
router.put("/:modelId", updatePerson);
router.delete("/:modelId", deletePerson);

export default router;

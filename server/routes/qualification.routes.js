import express from "express";
import {
  createQualification,
  getQualifications,
  getQualificationById,
  updateQualification,
  deleteQualification,
  deleteAllQualifications
} from "../controllers/qualification.controller.js";

const router = express.Router();

router.get("/", getQualifications);
router.get("/:id", getQualificationById);
router.post("/", createQualification);
router.put("/:id", updateQualification);
router.delete("/:id", deleteQualification);
router.delete("/", deleteAllQualifications);

export default router;

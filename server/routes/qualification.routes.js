import express from "express";
import {
  createQualification,
  getQualifications,
  updateQualification,
  deleteQualification
} from "../controllers/qualification.controller.js";

import { requireAuth, requireAdmin } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", getQualifications);
router.post("/", requireAuth, requireAdmin, createQualification);
router.put("/:id", requireAuth, requireAdmin, updateQualification);
router.delete("/:id", requireAuth, requireAdmin, deleteQualification);

export default router;

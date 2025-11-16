import express from "express";
import {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject
} from "../controllers/project.controller.js";

import { requireAuth, requireAdmin } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", requireAuth, requireAdmin, createProject);   // 🔥 PROTECTED
router.get("/", getProjects);
router.get("/:id", getProjectById);
router.put("/:id", requireAuth, requireAdmin, updateProject);
router.delete("/:id", requireAuth, requireAdmin, deleteProject);

export default router;

import express from "express";
import {
  createContact,
  getContacts,
  updateContact,
  deleteContact
} from "../controllers/contact.controller.js";

import { requireAuth, requireAdmin } from "../middleware/auth.middleware.js";

const router = express.Router();

// PUBLIC
router.post("/", createContact);

// ADMIN ONLY
router.get("/", requireAuth, requireAdmin, getContacts);
router.put("/:id", requireAuth, requireAdmin, updateContact);
router.delete("/:id", requireAuth, requireAdmin, deleteContact);

export default router;

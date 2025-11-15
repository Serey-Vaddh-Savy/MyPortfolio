import express from "express";
import * as userCtrl from "../controllers/user.controller.js";
import { requireAuth, requireAdmin } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/api/users", requireAuth, requireAdmin, userCtrl.list);

router.post("/api/users", requireAuth, requireAdmin, userCtrl.create);

router.get("/api/users/:userId", requireAuth, userCtrl.read);

router.put("/api/users/:userId", requireAuth, userCtrl.update);

router.delete("/api/users/:userId", requireAuth, requireAdmin, userCtrl.remove);

router.param("userId", userCtrl.userByID);

export default router;

import express from "express";
import { requireAuth, requireAdmin } from "../middlewares/auth.js";
import { promoteToAdmin } from "../controllers/promote.controller.js";

const router = express.Router();

// Authenticated clinician registration
router.post("/", requireAuth, promoteToAdmin);


export default router;

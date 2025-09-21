import express from "express";
import { createClinician, getClinicians } from "../controllers/clinician.controller.js";
import { requireAuth, requireAdmin } from "../middlewares/auth.js";

const router = express.Router();

// Authenticated clinician registration
router.post("/", requireAuth, createClinician);

// Admin-only endpoint
router.get("/", requireAuth, requireAdmin, getClinicians);

export default router;

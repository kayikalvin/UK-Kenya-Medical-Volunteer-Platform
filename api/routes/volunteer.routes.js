import express from "express";
import { createVolunteer, getVolunteers, verifyVolunteer } from "../controllers/volunteer.controller.js";
import { requireAuth, requireAdmin } from "../middlewares/auth.js"; // we’ll move your Clerk auth here

const router = express.Router();

// Authenticated volunteer registration
router.post("/", requireAuth, createVolunteer);

// Admin-only endpoints
router.get("/", requireAuth, requireAdmin, getVolunteers);
router.post("/verify", requireAuth, requireAdmin, verifyVolunteer);

export default router;

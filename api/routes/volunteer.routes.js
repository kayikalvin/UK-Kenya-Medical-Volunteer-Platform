import express from "express";
import { createVolunteer, getVolunteers, verifyVolunteer } from "../controllers/volunteer.controller.js";

import { requireAuth, requireAdmin } from "../middlewares/auth.js";

const router = express.Router();

// Register volunteer (authenticated)
router.post("/", requireAuth, createVolunteer);

// Get ALL volunteers (admin-only)
router.get("/", requireAuth, requireAdmin, getVolunteers);

// Public volunteers (anyone can see)
router.get("/public", getVolunteers);

// Verify volunteer (admin-only, RESTful)
router.patch("/:id/verify", requireAuth, requireAdmin, verifyVolunteer);

export default router;

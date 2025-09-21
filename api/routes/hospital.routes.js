import express from "express";
import { createHospital, getHospitals } from "../controllers/hospital.controller.js";
import { requireAuth, requireAdmin } from "../middlewares/auth.js";

const router = express.Router();

// Authenticated hospital registration
router.post("/", requireAuth, createHospital);

// Admin-only endpoint
router.get("/", requireAuth, requireAdmin, getHospitals);

export default router;

import express from "express";
import { createHospital, getHospitals, getVerifiedHospitals } from "../controllers/hospital.controller.js";
import { requireAuth, requireAdmin } from "../middlewares/auth.js";

const router = express.Router();

// Authenticated hospital registration
router.post("/", requireAuth, createHospital);

// 👇 Normal users can see verified hospitals
router.get("/public", requireAuth, getVerifiedHospitals);

// Admin-only endpoint
router.get("/", requireAuth, requireAdmin, getHospitals);

export default router;

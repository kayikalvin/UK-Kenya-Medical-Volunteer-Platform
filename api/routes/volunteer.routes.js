import express from "express";
import { createVolunteer, getVolunteers, verifyVolunteer } from "../controllers/volunteer.controller.js";
import { requireAuth, requireAdmin } from "../middlewares/auth.js";
import multer from "multer";

const router = express.Router();

// Multer storage setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Make sure this folder exists
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// Register volunteer with file upload (authenticated)
router.post("/", requireAuth, upload.array("documents"), createVolunteer);

// Get ALL volunteers (admin-only)
router.get("/", requireAuth, requireAdmin, getVolunteers);

// Public volunteers (anyone can see)
router.get("/public", getVolunteers);

// Verify volunteer (admin-only, RESTful)
router.patch("/:id/verify", requireAuth, requireAdmin, verifyVolunteer);

export default router;

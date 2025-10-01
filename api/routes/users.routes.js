import express from "express";
import { requireAuth, requireAdmin } from "../middlewares/auth.js";
import { createUser, getUsers } from "../controllers/users.controllers.js";

const router = express.Router();

// Create user after Clerk signup
router.post("/", createUser);

// Get all users (admin-only)
router.get("/", requireAuth, requireAdmin, getUsers);

export default router;

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Clerk } from "@clerk/clerk-sdk-node";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const clerk = new Clerk({ apiKey: process.env.CLERK_API_KEY });

// Middleware to verify Clerk session
const requireAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "No token provided" });

  const token = authHeader.replace("Bearer ", "");
  try {
    const session = await clerk.sessions.verifySessionToken(token);
    req.userId = session.userId;
    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ error: "Invalid token" });
  }
};

// Middleware to check admin role
const requireAdmin = async (req, res, next) => {
  try {
    const user = await clerk.users.getUser(req.userId);
    if (user.publicMetadata.role !== "admin") {
      return res.status(403).json({ error: "Not authorized" });
    }
    next();
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
};

app.get("/health", (req, res) => {
    res.send("API is running");
});
// Promote user to admin (admin-only)
app.post("/promote-to-admin", requireAuth, requireAdmin, async (req, res) => {
  const { userId } = req.body;
  if (!userId) return res.status(400).json({ error: "userId required" });

  try {
    const user = await clerk.users.updateUser(userId, {
      publicMetadata: { role: "admin" },
    });
    res.json({ message: `User ${userId} promoted to admin`, user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Verify volunteer (admin-only)
app.post("/verify-volunteer", requireAuth, requireAdmin, async (req, res) => {
  const { userId, verificationStatus } = req.body;
  if (!userId || !verificationStatus)
    return res.status(400).json({ error: "userId and verificationStatus required" });

  try {
    const user = await clerk.users.updateUser(userId, {
      publicMetadata: { verificationStatus },
    });
    res.json({ message: `User ${userId} updated to ${verificationStatus}`, user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Get current user info (authenticated)
app.get("/me", requireAuth, async (req, res) => {
  try {
    const user = await clerk.users.getUser(req.userId);
    res.json({ user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

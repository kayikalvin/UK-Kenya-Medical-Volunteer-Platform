// auth.js
import { getAuth, clerkClient } from "@clerk/express";

// Middleware: require any signed-in user
export const requireAuth = (req, res, next) => {
  const { userId } = getAuth(req);

  if (!userId) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  req.userId = userId; // attach Clerk userId to request
  next();
};

// Middleware: require an admin user
export const requireAdmin = async (req, res, next) => {
  try {
    const userId = req.userId || getAuth(req).userId;

    if (!userId) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    const user = await clerkClient.users.getUser(userId);

    if (user?.publicMetadata?.role !== "admin") {
      return res.status(403).json({ error: "Not authorized" });
    }

    next();
  } catch (err) {
    console.error("requireAdmin error:", err);
    return res.status(500).json({ error: "Server error" });
  }
};

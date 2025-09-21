import { Clerk } from "@clerk/clerk-sdk-node";

const clerk = new Clerk({ apiKey: process.env.CLERK_API_KEY });

// Middleware to verify Clerk session (for authenticated users)
export const requireAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader)
    return res.status(401).json({ error: "No token provided" });

  const token = authHeader.replace("Bearer ", "");

  try {
    const session = await clerk.sessions.verifySessionToken(token);
    req.userId = session.userId; // attach Clerk userId to request
    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ error: "Invalid token" });
  }
};

// Middleware to check if user is admin
export const requireAdmin = async (req, res, next) => {
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

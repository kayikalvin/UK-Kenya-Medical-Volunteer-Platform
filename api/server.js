import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

// 👇 import Clerk middleware
import { clerkMiddleware } from "@clerk/express";

import volunteerRoutes from "./routes/volunteer.routes.js";
import hospitalRoutes from "./routes/hospital.routes.js";
import clinicianRoutes from "./routes/clinician.routes.js";
import promoteRoutes from "./routes/promote.routes.js";
import usersRoute from "./routes/users.routes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// 👇 add Clerk middleware before routes
app.use(
  clerkMiddleware({
    publishableKey: process.env.CLERK_PUBLISHABLE_KEY,
    secretKey: process.env.CLERK_SECRET_KEY,
  })
);

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

console.log("Clerk publishable key:", process.env.CLERK_PUBLISHABLE_KEY);
console.log("Clerk secret key:", process.env.CLERK_SECRET_KEY ? "Loaded ✅" : "Missing ❌");

app.use("/api/users", usersRoute); // NEW
app.use("/api/volunteers", volunteerRoutes);
app.use("/api/hospitals", hospitalRoutes);
app.use("/api/clinicians", clinicianRoutes);
app.use("/api/promote", promoteRoutes);

app.get("/health", (req, res) => res.send("API is running"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

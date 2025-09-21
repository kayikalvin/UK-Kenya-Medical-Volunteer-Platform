import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import volunteerRoutes from "./routes/volunteer.routes.js";
import hospitalRoutes from "./routes/hospital.routes.js";
import clinicianRoutes from "./routes/clinician.routes.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

app.use("/volunteers", volunteerRoutes);
app.use("/hospitals", hospitalRoutes);
app.use("/clinicians", clinicianRoutes);

app.get("/health", (req, res) => res.send("API is running"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

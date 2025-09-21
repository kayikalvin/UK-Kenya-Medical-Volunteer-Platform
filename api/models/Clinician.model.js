import mongoose from "mongoose";

const clinicianSchema = new mongoose.Schema({
  title: String,
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: String,
  profession: String,
  specialty: String,
  experience: Number,
  gmcNumber: String,
  employer: String,
  availability: String,
  preferredCounties: [String],
  additionalInfo: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Clinician", clinicianSchema);

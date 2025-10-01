import mongoose from "mongoose";

const hospitalSchema = new mongoose.Schema({
  clerkId: { type: String, required: true }, // link hospital to Clerk user
  name: { type: String, required: true },
  type: String,
  county: String,
  beds: Number,
  contactPerson: String,
  contactTitle: String,
  contactEmail: String,
  contactPhone: String,
  latitude: String,
  longitude: String,
  clinicalNeeds: String,
  departments: [String],
  accommodation: String,
  createdAt: { type: Date, default: Date.now },
});


export default mongoose.model("Hospital", hospitalSchema);



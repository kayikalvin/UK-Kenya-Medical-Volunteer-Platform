import mongoose from "mongoose";

const volunteerSchema = new mongoose.Schema(
  {
    clerkId: { type: String, required: true }, // Link to Clerk user
    firstName: String,
    lastName: String,
    email: { type: String, required: true },
    phone: String,
    profession: String,
    specialty: String,
    registrationNumber: String,
    yearsExperience: String,
    currentEmployer: String,
    availabilityStart: Date,
    availabilityEnd: Date,
    preferredDuration: String,
    languages: String,
    motivation: String,
    previousVolunteer: String,
    verificationStatus: {
      type: String,
      enum: ["pending", "verified", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Volunteer", volunteerSchema);

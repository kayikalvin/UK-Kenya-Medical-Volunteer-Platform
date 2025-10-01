import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    clerkId: { type: String, required: true, unique: true }, // Clerk user ID

    // 👇 expanded roles
    role: { 
      type: String, 
      enum: ["professional", "organization", "admin"], 
      default: "professional" 
    },

    // extra fields for clarity
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String },

    verificationStatus: {
      type: String,
      enum: ["pending", "verified", "rejected"],
      default: "pending",
    },

  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);

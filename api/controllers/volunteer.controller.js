import Volunteer from "../models/Volunteer.model.js";

/// Create volunteer
export const createVolunteer = async (req, res) => {
  const clerkId = req.auth.userId; // Clerk middleware gives you req.auth
  const {
    firstName,
    lastName,
    email,
    phone,
    profession,
    specialty,
    registrationNumber,
    yearsExperience,
    currentEmployer,
    availabilityStart,
    availabilityEnd,
    preferredDuration,
    languages,
    motivation,
    previousVolunteer,
  } = req.body;

  try {
    const volunteer = new Volunteer({
      clerkId,
      firstName,
      lastName,
      email,
      phone,
      profession,
      specialty,
      registrationNumber,
      yearsExperience,
      currentEmployer,
      availabilityStart,
      availabilityEnd,
      preferredDuration,
      languages,
      motivation,
      previousVolunteer,
    });

    await volunteer.save();
    res
      .status(201)
      .json({ message: "Volunteer registered successfully", volunteer });
  } catch (err) {
    console.error("Error creating volunteer:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// Get all volunteers (admin)
export const getVolunteers = async (req, res) => {
  try {
    const volunteers = await Volunteer.find();
    res.json(volunteers);
  } catch (err) {
    console.error("Error fetching volunteers:", err);
    res.status(500).json({ error: "Server error", details: err.message });
  }
};

// Verify volunteer (admin, RESTful)
export const verifyVolunteer = async (req, res) => {
  const { id } = req.params; // 👈 take ID from route param
  const { status } = req.body; // expecting { "status": "verified" | "rejected" }

  if (!status) {
    return res.status(400).json({ error: "status is required" });
  }

  try {
    const volunteer = await Volunteer.findByIdAndUpdate(
      id,
      { verificationStatus: status },
      { new: true }
    );

    if (!volunteer) {
      return res.status(404).json({ error: "Volunteer not found" });
    }

    res.json({
      message: `Volunteer marked as ${status}`,
      volunteer,
    });
  } catch (err) {
    console.error("Verify volunteer error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

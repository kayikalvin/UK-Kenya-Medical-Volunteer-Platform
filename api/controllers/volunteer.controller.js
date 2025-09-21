import Volunteer from "../models/Volunteer.model.js";

// Create volunteer
export const createVolunteer = async (req, res) => {
  const clerkUserId = req.userId;
  const { firstName, lastName, email, phone, profession, specialty, registrationNumber, yearsExperience, currentEmployer, availabilityStart, availabilityEnd, preferredDuration, languages, motivation, previousVolunteer } = req.body;

  try {
    const volunteer = new Volunteer({
      clerkUserId,
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
    res.status(201).json({ message: "Volunteer registered successfully", volunteer });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// Get all volunteers (admin)
export const getVolunteers = async (req, res) => {
  try {
    const volunteers = await Volunteer.find();
    res.json(volunteers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// Verify volunteer (admin)
export const verifyVolunteer = async (req, res) => {
  const { volunteerId, verificationStatus } = req.body;
  if (!volunteerId || !verificationStatus) return res.status(400).json({ error: "volunteerId and verificationStatus required" });

  try {
    const volunteer = await Volunteer.findByIdAndUpdate(volunteerId, { verificationStatus }, { new: true });
    res.json({ message: `Volunteer ${verificationStatus}`, volunteer });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// controllers/users.controller.js
import Volunteer from "../models/Volunteer.model.js";
import Hospital from "../models/Hospital.model.js";

// Create user (after Clerk signup)
export const createUser = async (req, res) => {
  const { clerkId, role, firstName, lastName, email } = req.body;

  if (!clerkId || !role) {
    return res.status(400).json({ error: "Missing required fields: clerkId or role" });
  }

  try {
    let newUser;

    if (role === "professional") {
      // Save to Volunteers collection
      newUser = new Volunteer({
        clerkId,
        firstName,
        lastName,
        email,
        role,
      });
    } else if (role === "organization") {
      // Save to Hospitals collection
      newUser = new Hospital({
        clerkId,
        firstName,
        lastName,
        email,
        role,
      });
    } else {
      return res.status(400).json({ error: "Invalid role provided" });
    }

    await newUser.save();
    res.status(201).json({ message: `${role} created successfully`, user: newUser });
  } catch (err) {
    console.error("Error creating user:", err);
    res.status(500).json({ error: "Server error", details: err.message });
  }
};

// Get all users (admin only)
export const getUsers = async (req, res) => {
  try {
    // Fetch all volunteers and hospitals
    const volunteers = await Volunteer.find();
    const hospitals = await Hospital.find();

    res.json({ volunteers, hospitals });
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ error: "Server error" });
  }
};

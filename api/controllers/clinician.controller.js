import Clinician from "../models/Clinician.model.js";

// Create clinician
export const createClinician = async (req, res) => {
  try {
    const clinician = new Clinician(req.body);
    await clinician.save();
    res.status(201).json({ message: "Clinician registered successfully", clinician });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// Get all clinicians
export const getClinicians = async (req, res) => {
  try {
    const clinicians = await Clinician.find();
    res.json(clinicians);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

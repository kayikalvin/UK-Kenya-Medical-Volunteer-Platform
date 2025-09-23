import Hospital from "../models/Hospital.model.js";

// Create hospital
export const createHospital = async (req, res) => {
  try {
    const hospital = new Hospital(req.body);
    await hospital.save();
    res.status(201).json({ message: "Hospital registered successfully", hospital });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// Get all hospitals
export const getHospitals = async (req, res) => {
  try {
    const hospitals = await Hospital.find();
    res.json(hospitals);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
// Public: get only verified OR all (depending on your design)
export const getVerifiedHospitals = async (req, res) => {
  try {
    // 🔹 If you want only verified ones
    // const hospitals = await Hospital.find({ verified: true });

    // 🔹 Since your hospital object doesn’t have `verified`,
    // we’ll just return all for now
    const hospitals = await Hospital.find();

    res.status(200).json(hospitals);
  } catch (error) {
    console.error("Error fetching public hospitals:", error);
    res.status(500).json({ error: "Failed to fetch hospitals" });
  }
};
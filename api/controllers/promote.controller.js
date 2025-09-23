import User from "../models/User.model.js"; // adjust to your user model

// Promote a user to admin
export const promoteToAdmin = async (req, res) => {
  const { userId } = req.body;
  if (!userId) return res.status(400).json({ error: "userId required" });

  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { "publicMetadata.role": "admin" },
      { new: true }
    );
    if (!user) return res.status(404).json({ error: "User not found" });

    res.json({ message: "User promoted to admin", user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

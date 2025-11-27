const Model = require("../../database/models/MilkSession");

// CREATE
exports.createMilkSession = async (req, res) => {
  try {
    const { name, isActive } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Session name is required" });
    }

    const session = await Model.create({
      name,
      isActive: isActive ?? true,
      createdBy: req.user._id
    });

    res.status(201).json({ success: true, data: session });
  } catch (err) {
    console.error("Create Milk Session Error:", err);
    res.status(500).json({ message: "Failed to create session" });
  }
};

// GET ALL
exports.getMilkSessions = async (req, res) => {
  const sessions = await Model.find().sort({ createdAt: -1 });
  res.json({ success: true, data: sessions });
};

// GET SINGLE
exports.getMilkSessionById = async (req, res) => {
  const session = await Model.findById(req.params.id);
  if (!session) return res.status(404).json({ message: "Session not found" });
  res.json({ success: true, data: session });
};

// UPDATE
exports.updateMilkSession = async (req, res) => {
  const session = await Model.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  if (!session) return res.status(404).json({ message: "Session not found" });

  res.json({ success: true, data: session });
};

// DELETE
exports.deleteMilkSession = async (req, res) => {
  const session = await Model.findByIdAndDelete(req.params.id);
  if (!session) return res.status(404).json({ message: "Session not found" });

  res.json({ success: true, message: "Session deleted successfully" });
};

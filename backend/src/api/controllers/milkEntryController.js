const MilkEntry = require("../../database/models/MilkEntry");
const User = require("../../database/models/User");

exports.getAllEntries = async (req, res) => {
  try {
    const entries = await MilkEntry.find()
      .populate("farmerId", "name phone")
      .populate("sessionId", "sessionName date")
      .sort({ createdAt: -1 });

    res.json({ success: true, data: entries });
  } catch (err) {
    console.error("Milk entries fetch error:", err);
    res.status(500).json({ message: "Failed to load milk entries" });
  }
};

exports.getMyEntries = async (req, res) => {
  try {
    const farmerId = req.user._id;

    const entries = await MilkEntry.find({ farmerId })
      .populate("sessionId", "sessionName date")
      .sort({ createdAt: -1 });

    res.json({ success: true, data: entries });
  } catch (err) {
    console.error("Farmer milk entries error:", err);
    res.status(500).json({ message: "Failed to load your entries" });
  }
};


exports.getEntriesByFarmer = async (req, res) => {
  try {
    const farmerId = req.params.id;

    const entries = await MilkEntry.find({ farmerId })
      .populate("sessionId", "sessionName date")
      .sort({ createdAt: -1 });

    res.json({ success: true, data: entries });
  } catch (err) {
    console.error("Get entries by farmer error:", err);
    res.status(500).json({ message: "Failed to load farmer entries" });
  }
};

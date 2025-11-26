const Rate = require("../models/Rate");

// --------------------------------------------------
// GET CURRENT RATE
// --------------------------------------------------
exports.getRate = async (req, res) => {
  try {
    let rate = await Rate.findOne();

    // If no rate exists, create a default one
    if (!rate) {
      rate = await Rate.create({
        currentRate: 3,
        updatedBy: req.user._id,
      });
    }

    res.json({ success: true, data: rate });
  } catch (err) {
    console.error("Error fetching rate:", err);
    res.status(500).json({ message: "Failed to fetch rate" });
  }
};

// --------------------------------------------------
// UPDATE RATE (Admin)
// --------------------------------------------------
exports.updateRate = async (req, res) => {
  try {
    const { currentRate } = req.body;

    if (!currentRate || currentRate <= 0) {
      return res.status(400).json({ message: "Rate must be a positive number" });
    }

    let rate = await Rate.findOne();

    if (!rate) {
      // If rate does not exist, create one
      rate = await Rate.create({
        currentRate,
        updatedBy: req.user._id,
      });
    } else {
      // Update existing rate
      rate.currentRate = currentRate;
      rate.updatedBy = req.user._id;
      await rate.save();
    }

    res.json({
      success: true,
      message: "Rate updated successfully",
      data: rate,
    });
  } catch (err) {
    console.error("Error updating rate:", err);
    res.status(500).json({ message: "Failed to update rate" });
  }
};

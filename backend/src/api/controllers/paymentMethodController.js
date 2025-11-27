const PaymentMethod = require("../../database/models/PaymentMethod");

// ➤ CREATE
exports.createPaymentMethod = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(400).json({ success: false, message: "Invalid user" });
    }

    const { name, isActive = true } = req.body;

    if (!name) {
      return res.status(400).json({ success: false, message: "Name is required" });
    }

    const exists = await PaymentMethod.findOne({ name });
    if (exists) {
      return res.status(400).json({ success: false, message: "Payment method already exists" });
    }

    const doc = await PaymentMethod.create({
      name,
      isActive,
      createdBy: req.user._id,
    });

    res.status(201).json({ success: true, data: doc });
  } catch (err) {
    console.error("Payment Method Create Error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ➤ GET ALL
exports.getPaymentMethods = async (req, res) => {
  try {
    const list = await PaymentMethod.find().sort({ createdAt: -1 });
    res.json({ success: true, data: list });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ➤ GET ONE
exports.getPaymentMethodById = async (req, res) => {
  try {
    const doc = await PaymentMethod.findById(req.params.id);
    if (!doc) {
      return res.status(404).json({ success: false, message: "Payment method not found" });
    }
    res.json({ success: true, data: doc });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ➤ UPDATE
exports.updatePaymentMethod = async (req, res) => {
  try {
    const { name, isActive } = req.body;

    const updated = await PaymentMethod.findByIdAndUpdate(
      req.params.id,
      { name, isActive },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ success: false, message: "Payment method not found" });
    }

    res.json({ success: true, data: updated });
  } catch (err) {
    console.error("Update Error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ➤ DELETE
exports.deletePaymentMethod = async (req, res) => {
  try {
    const deleted = await PaymentMethod.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: "Payment method not found" });
    }

    res.json({ success: true, message: "Payment method deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

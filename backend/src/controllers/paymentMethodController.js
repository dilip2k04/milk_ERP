const Model = require("../models/PaymentMethod");

// BASIC CRUD - customize as needed

exports.createPaymentMethod = async (req, res, next) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(400).json({ message: "Invalid user (createdBy missing)" });
    }

    const doc = await Model.create({
      name: req.body.name,
      isActive: req.body.isActive,
      createdBy: req.user._id,   // 🔥 FIXED
    });

    res.status(201).json({ success: true, data: doc });
  } catch (err) {
    console.error("Payment Method Create Error:", err);
    next(err);
  }
};


exports.getPaymentMethods = async (req, res, next) => {
  try {
    const docs = await Model.find();
    res.json(docs);
  } catch (err) {
    next(err);
  }
};

exports.getPaymentMethodById = async (req, res, next) => {
  try {
    const doc = await Model.findById(req.params.id);
    if (!doc) return res.status(404).json({ message: "PaymentMethod not found" });
    res.json(doc);
  } catch (err) {
    next(err);
  }
};

exports.updatePaymentMethod = async (req, res, next) => {
  try {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!doc) return res.status(404).json({ message: "PaymentMethod not found" });
    res.json(doc);
  } catch (err) {
    next(err);
  }
};

exports.deletePaymentMethod = async (req, res, next) => {
  try {
    const doc = await Model.findByIdAndDelete(req.params.id);
    if (!doc) return res.status(404).json({ message: "PaymentMethod not found" });
    res.json({ message: "PaymentMethod deleted" });
  } catch (err) {
    next(err);
  }
};

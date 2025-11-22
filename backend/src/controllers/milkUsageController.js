const Model = require("../models/MilkUsage");

// BASIC CRUD - customize as needed

exports.createMilkUsage = async (req, res, next) => {
  try {
    const doc = await Model.create(req.body);
    res.status(201).json(doc);
  } catch (err) {
    next(err);
  }
};

exports.getMilkUsages = async (req, res, next) => {
  try {
    const docs = await Model.find();
    res.json(docs);
  } catch (err) {
    next(err);
  }
};

exports.getMilkUsageById = async (req, res, next) => {
  try {
    const doc = await Model.findById(req.params.id);
    if (!doc) return res.status(404).json({ message: "MilkUsage not found" });
    res.json(doc);
  } catch (err) {
    next(err);
  }
};

exports.updateMilkUsage = async (req, res, next) => {
  try {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!doc) return res.status(404).json({ message: "MilkUsage not found" });
    res.json(doc);
  } catch (err) {
    next(err);
  }
};

exports.deleteMilkUsage = async (req, res, next) => {
  try {
    const doc = await Model.findByIdAndDelete(req.params.id);
    if (!doc) return res.status(404).json({ message: "MilkUsage not found" });
    res.json({ message: "MilkUsage deleted" });
  } catch (err) {
    next(err);
  }
};

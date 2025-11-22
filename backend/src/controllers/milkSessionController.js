const Model = require("../models/MilkSession");

// BASIC CRUD - customize as needed

exports.createMilkSession = async (req, res, next) => {
  try {
    const doc = await Model.create(req.body);
    res.status(201).json(doc);
  } catch (err) {
    next(err);
  }
};

exports.getMilkSessions = async (req, res, next) => {
  try {
    const docs = await Model.find();
    res.json(docs);
  } catch (err) {
    next(err);
  }
};

exports.getMilkSessionById = async (req, res, next) => {
  try {
    const doc = await Model.findById(req.params.id);
    if (!doc) return res.status(404).json({ message: "MilkSession not found" });
    res.json(doc);
  } catch (err) {
    next(err);
  }
};

exports.updateMilkSession = async (req, res, next) => {
  try {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!doc) return res.status(404).json({ message: "MilkSession not found" });
    res.json(doc);
  } catch (err) {
    next(err);
  }
};

exports.deleteMilkSession = async (req, res, next) => {
  try {
    const doc = await Model.findByIdAndDelete(req.params.id);
    if (!doc) return res.status(404).json({ message: "MilkSession not found" });
    res.json({ message: "MilkSession deleted" });
  } catch (err) {
    next(err);
  }
};

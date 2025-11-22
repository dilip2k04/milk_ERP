const Model = require("../models/MilkEntry");

// BASIC CRUD - customize as needed

exports.createMilkEntry = async (req, res, next) => {
  try {
    const doc = await Model.create(req.body);
    res.status(201).json(doc);
  } catch (err) {
    next(err);
  }
};

exports.getMilkEntrys = async (req, res, next) => {
  try {
    const docs = await Model.find();
    res.json(docs);
  } catch (err) {
    next(err);
  }
};

exports.getMilkEntryById = async (req, res, next) => {
  try {
    const doc = await Model.findById(req.params.id);
    if (!doc) return res.status(404).json({ message: "MilkEntry not found" });
    res.json(doc);
  } catch (err) {
    next(err);
  }
};

exports.updateMilkEntry = async (req, res, next) => {
  try {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!doc) return res.status(404).json({ message: "MilkEntry not found" });
    res.json(doc);
  } catch (err) {
    next(err);
  }
};

exports.deleteMilkEntry = async (req, res, next) => {
  try {
    const doc = await Model.findByIdAndDelete(req.params.id);
    if (!doc) return res.status(404).json({ message: "MilkEntry not found" });
    res.json({ message: "MilkEntry deleted" });
  } catch (err) {
    next(err);
  }
};

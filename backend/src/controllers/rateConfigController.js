const Model = require("../models/RateConfig");

// BASIC CRUD - customize as needed

exports.createRateConfig = async (req, res, next) => {
  try {
    const doc = await Model.create(req.body);
    res.status(201).json(doc);
  } catch (err) {
    next(err);
  }
};

exports.getRateConfigs = async (req, res, next) => {
  try {
    const docs = await Model.find();
    res.json(docs);
  } catch (err) {
    next(err);
  }
};

exports.getRateConfigById = async (req, res, next) => {
  try {
    const doc = await Model.findById(req.params.id);
    if (!doc) return res.status(404).json({ message: "RateConfig not found" });
    res.json(doc);
  } catch (err) {
    next(err);
  }
};

exports.updateRateConfig = async (req, res, next) => {
  try {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!doc) return res.status(404).json({ message: "RateConfig not found" });
    res.json(doc);
  } catch (err) {
    next(err);
  }
};

exports.deleteRateConfig = async (req, res, next) => {
  try {
    const doc = await Model.findByIdAndDelete(req.params.id);
    if (!doc) return res.status(404).json({ message: "RateConfig not found" });
    res.json({ message: "RateConfig deleted" });
  } catch (err) {
    next(err);
  }
};

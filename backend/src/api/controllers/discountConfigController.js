const Model = require("../../database/models/DiscountConfig");

// BASIC CRUD - customize as needed

exports.createDiscountConfig = async (req, res, next) => {
  try {
    const doc = await Model.create(req.body);
    res.status(201).json(doc);
  } catch (err) {
    next(err);
  }
};

exports.getDiscountConfigs = async (req, res, next) => {
  try {
    const docs = await Model.find();
    res.json(docs);
  } catch (err) {
    next(err);
  }
};

exports.getDiscountConfigById = async (req, res, next) => {
  try {
    const doc = await Model.findById(req.params.id);
    if (!doc) return res.status(404).json({ message: "DiscountConfig not found" });
    res.json(doc);
  } catch (err) {
    next(err);
  }
};

exports.updateDiscountConfig = async (req, res, next) => {
  try {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!doc) return res.status(404).json({ message: "DiscountConfig not found" });
    res.json(doc);
  } catch (err) {
    next(err);
  }
};

exports.deleteDiscountConfig = async (req, res, next) => {
  try {
    const doc = await Model.findByIdAndDelete(req.params.id);
    if (!doc) return res.status(404).json({ message: "DiscountConfig not found" });
    res.json({ message: "DiscountConfig deleted" });
  } catch (err) {
    next(err);
  }
};

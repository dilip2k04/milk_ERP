const Model = require("../../database/models/Farmer");

// BASIC CRUD - customize as needed

exports.createFarmer = async (req, res, next) => {
  try {
    const doc = await Model.create(req.body);
    res.status(201).json(doc);
  } catch (err) {
    next(err);
  }
};

exports.getFarmers = async (req, res, next) => {
  try {
    const docs = await Model.find();
    res.json(docs);
  } catch (err) {
    next(err);
  }
};

exports.getFarmerById = async (req, res, next) => {
  try {
    const doc = await Model.findById(req.params.id);
    if (!doc) return res.status(404).json({ message: "Farmer not found" });
    res.json(doc);
  } catch (err) {
    next(err);
  }
};

exports.updateFarmer = async (req, res, next) => {
  try {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!doc) return res.status(404).json({ message: "Farmer not found" });
    res.json(doc);
  } catch (err) {
    next(err);
  }
};

exports.deleteFarmer = async (req, res, next) => {
  try {
    const doc = await Model.findByIdAndDelete(req.params.id);
    if (!doc) return res.status(404).json({ message: "Farmer not found" });
    res.json({ message: "Farmer deleted" });
  } catch (err) {
    next(err);
  }
};

const Model = require("../models/ProductType");

// BASIC CRUD - customize as needed

exports.createProductType = async (req, res, next) => {
  try {
    const doc = await Model.create(req.body);
    res.status(201).json(doc);
  } catch (err) {
    next(err);
  }
};

exports.getProductTypes = async (req, res, next) => {
  try {
    const docs = await Model.find();
    res.json(docs);
  } catch (err) {
    next(err);
  }
};

exports.getProductTypeById = async (req, res, next) => {
  try {
    const doc = await Model.findById(req.params.id);
    if (!doc) return res.status(404).json({ message: "ProductType not found" });
    res.json(doc);
  } catch (err) {
    next(err);
  }
};

exports.updateProductType = async (req, res, next) => {
  try {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!doc) return res.status(404).json({ message: "ProductType not found" });
    res.json(doc);
  } catch (err) {
    next(err);
  }
};

exports.deleteProductType = async (req, res, next) => {
  try {
    const doc = await Model.findByIdAndDelete(req.params.id);
    if (!doc) return res.status(404).json({ message: "ProductType not found" });
    res.json({ message: "ProductType deleted" });
  } catch (err) {
    next(err);
  }
};

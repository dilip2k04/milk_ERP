const Model = require("../models/ProductStock");

// BASIC CRUD - customize as needed

exports.createProductStock = async (req, res, next) => {
  try {
    const doc = await Model.create(req.body);
    res.status(201).json(doc);
  } catch (err) {
    next(err);
  }
};

exports.getProductStocks = async (req, res, next) => {
  try {
    const docs = await Model.find();
    res.json(docs);
  } catch (err) {
    next(err);
  }
};

exports.getProductStockById = async (req, res, next) => {
  try {
    const doc = await Model.findById(req.params.id);
    if (!doc) return res.status(404).json({ message: "ProductStock not found" });
    res.json(doc);
  } catch (err) {
    next(err);
  }
};

exports.updateProductStock = async (req, res, next) => {
  try {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!doc) return res.status(404).json({ message: "ProductStock not found" });
    res.json(doc);
  } catch (err) {
    next(err);
  }
};

exports.deleteProductStock = async (req, res, next) => {
  try {
    const doc = await Model.findByIdAndDelete(req.params.id);
    if (!doc) return res.status(404).json({ message: "ProductStock not found" });
    res.json({ message: "ProductStock deleted" });
  } catch (err) {
    next(err);
  }
};

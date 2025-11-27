// src/controllers/productTypeController.js
const asyncHandler = require("../../core/middleware/asyncHandler");
const ProductType = require("../../database/models/ProductType");
const Product = require("../../database/models/Product");

// Small helper to be safe
function ensureAdmin(req, res) {
  if (req.role !== "admin") {
    res.status(403).json({ message: "Admin access required" });
    return false;
  }
  return true;
}

// CREATE Product Type
exports.createProductType = asyncHandler(async (req, res) => {
  if (!ensureAdmin(req, res)) return;

  const { name, description, isActive = true } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Name is required" });
  }

  const doc = await ProductType.create({
    name,
    description: description || "",
    isActive,
    createdBy: req.user._id
  });

  res.status(201).json({ success: true, data: doc });
});

// GET ALL Product Types
exports.getProductTypes = asyncHandler(async (req, res) => {
  if (!ensureAdmin(req, res)) return;

  const docs = await ProductType.find().sort({ createdAt: -1 });
  res.json({ success: true, data: docs });
});

// GET SINGLE Product Type
exports.getProductTypeById = asyncHandler(async (req, res) => {
  if (!ensureAdmin(req, res)) return;

  const doc = await ProductType.findById(req.params.id);
  if (!doc) return res.status(404).json({ message: "Product type not found" });

  res.json({ success: true, data: doc });
});

// UPDATE Product Type
exports.updateProductType = asyncHandler(async (req, res) => {
  if (!ensureAdmin(req, res)) return;

  const { name, description, isActive } = req.body;

  const doc = await ProductType.findById(req.params.id);
  if (!doc) return res.status(404).json({ message: "Product type not found" });

  if (typeof name !== "undefined") doc.name = name;
  if (typeof description !== "undefined") doc.description = description;
  if (typeof isActive !== "undefined") doc.isActive = isActive;

  await doc.save();

  res.json({ success: true, data: doc });
});

// DELETE Product Type
exports.deleteProductType = asyncHandler(async (req, res) => {
  if (!ensureAdmin(req, res)) return;

  const doc = await ProductType.findById(req.params.id);
  if (!doc) return res.status(404).json({ message: "Product type not found" });

  // Optional: avoid deleting if products exist
  const productCount = await Product.countDocuments({ productTypeId: doc._id });
  if (productCount > 0) {
    return res.status(400).json({
      message: "Cannot delete: products are linked to this product type"
    });
  }

  await doc.deleteOne();

  res.json({ success: true, message: "Product type deleted" });
});

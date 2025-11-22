// src/controllers/productController.js
const asyncHandler = require("../middleware/asyncHandler");
const Product = require("../models/Product");
const ProductType = require("../models/ProductType");
const ProductStock = require("../models/ProductStock");

function ensureAdmin(req, res) {
  if (req.role !== "admin") {
    res.status(403).json({ message: "Admin access required" });
    return false;
  }
  return true;
}

// CREATE Product
exports.createProduct = asyncHandler(async (req, res) => {
  if (!ensureAdmin(req, res)) return;

  const { productTypeId, name, unit, size, price, isActive = true } = req.body;

  if (!productTypeId || !name || !unit || typeof price === "undefined") {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const pt = await ProductType.findById(productTypeId);
  if (!pt) {
    return res.status(400).json({ message: "Invalid product type" });
  }

  const product = await Product.create({
    productTypeId,
    name,
    unit,
    size: size || "",
    price,
    isActive,
    createdBy: req.user._id
  });

  // Initialize stock record with 0
  await ProductStock.create({
    productId: product._id,
    quantity: 0
  });

  res.status(201).json({ success: true, data: product });
});

// GET ALL Products
exports.getProducts = asyncHandler(async (req, res) => {
  if (!ensureAdmin(req, res)) return;

  const products = await Product.find()
    .populate("productTypeId", "name")
    .sort({ createdAt: -1 });

  res.json({ success: true, data: products });
});

// GET SINGLE Product
exports.getProductById = asyncHandler(async (req, res) => {
  if (!ensureAdmin(req, res)) return;

  const product = await Product.findById(req.params.id).populate(
    "productTypeId",
    "name"
  );
  if (!product) return res.status(404).json({ message: "Product not found" });

  res.json({ success: true, data: product });
});

// UPDATE Product
exports.updateProduct = asyncHandler(async (req, res) => {
  if (!ensureAdmin(req, res)) return;

  const { productTypeId, name, unit, size, price, isActive } = req.body;

  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: "Product not found" });

  if (productTypeId) {
    const pt = await ProductType.findById(productTypeId);
    if (!pt) {
      return res.status(400).json({ message: "Invalid product type" });
    }
    product.productTypeId = productTypeId;
  }

  if (typeof name !== "undefined") product.name = name;
  if (typeof unit !== "undefined") product.unit = unit;
  if (typeof size !== "undefined") product.size = size;
  if (typeof price !== "undefined") product.price = price;
  if (typeof isActive !== "undefined") product.isActive = isActive;

  await product.save();

  res.json({ success: true, data: product });
});

// DELETE Product
exports.deleteProduct = asyncHandler(async (req, res) => {
  if (!ensureAdmin(req, res)) return;

  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: "Product not found" });

  await ProductStock.deleteOne({ productId: product._id });
  await product.deleteOne();

  res.json({ success: true, message: "Product deleted" });
});

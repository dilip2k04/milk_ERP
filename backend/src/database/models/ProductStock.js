// src/models/ProductStock.js
const mongoose = require("mongoose");

const productStockSchema = new mongoose.Schema(
  {
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", unique: true, required: true },
    quantity: { type: Number, default: 0 }
  },
  { timestamps: true }
);

module.exports = mongoose.model("ProductStock", productStockSchema);

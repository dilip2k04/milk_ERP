// src/models/Product.js
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    productTypeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductType",
      required: true,
    },
    name: { type: String, required: true },
    unit: { type: String, required: true }, // liter, packet, etc.
    size: String, // 500ml, 1L, etc.
    price: { type: Number, required: true },

    currentStock: { type: Number, required: true, default: 0 },

    isActive: { type: Boolean, default: true },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

productSchema.index({ productTypeId: 1 });

module.exports = mongoose.model("Product", productSchema);

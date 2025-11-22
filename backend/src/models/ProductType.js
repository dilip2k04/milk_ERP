// src/models/ProductType.js
const mongoose = require("mongoose");

const productTypeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    description: String,
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("ProductType", productTypeSchema);

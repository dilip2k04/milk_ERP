const mongoose = require("mongoose");

const milkUsageSchema = new mongoose.Schema(
  {
    productTypeId: { type: mongoose.Schema.Types.ObjectId, ref: "ProductType", required: true },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    litersUsed: { type: Number, required: true },
    productProduced: { type: Number },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("MilkUsage", milkUsageSchema);

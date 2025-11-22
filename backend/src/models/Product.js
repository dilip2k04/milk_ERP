const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    productTypeId: { type: mongoose.Schema.Types.ObjectId, ref: "ProductType", required: true },
    name: { type: String, required: true },
    unit: { type: String, required: true }, // liter, packet
    size: String, // 500ml etc
    price: { type: Number, required: true },
    isActive: { type: Boolean, default: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
  },
  { timestamps: true }
);

productSchema.index({ productTypeId: 1 });

module.exports = mongoose.model("Product", productSchema);

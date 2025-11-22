const mongoose = require("mongoose");

const discountConfigSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    discountType: { type: String, enum: ["percentage", "fixed_amount"], required: true },
    discountValue: { type: Number, required: true },
    minOrderAmount: Number,
    isActive: { type: Boolean, default: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("DiscountConfig", discountConfigSchema);

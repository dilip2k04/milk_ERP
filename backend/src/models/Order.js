const mongoose = require("mongoose");
const { ORDER_STATUSES } = require("../config/appConfig");

const orderSchema = new mongoose.Schema(
  {
    shopKeeperId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    quantity: { type: Number, required: true },
    paymentType: { type: String, enum: ["full", "partial"], required: true },
    paidAmount: { type: Number, default: 0 },
    balance: { type: Number, required: true },
    paymentMethodId: { type: mongoose.Schema.Types.ObjectId, ref: "PaymentMethod", required: true },
    status: {
      type: String,
      enum: Object.values(ORDER_STATUSES),
      default: ORDER_STATUSES.PENDING
    },
    discountApplied: { type: Number, default: 0 }
  },
  { timestamps: true }
);

orderSchema.index({ shopKeeperId: 1 });

module.exports = mongoose.model("Order", orderSchema);

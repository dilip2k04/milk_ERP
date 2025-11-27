const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    type: { type: String, enum: ["farmer_payout", "shopkeeper_receipt"], required: true },
    farmerId: { type: mongoose.Schema.Types.ObjectId, ref: "Farmer" },
    shopKeeperId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    amount: { type: Number, required: true },
    // for farmer payouts, use mode field
    mode: { type: String, enum: ["cash", "gpay"], required: false },
    // for shopkeepers payments
    paymentMethodId: { type: mongoose.Schema.Types.ObjectId, ref: "PaymentMethod" },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Payment", paymentSchema);

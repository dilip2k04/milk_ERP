const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema(
  {
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    productName: { type: String, required: true },
    quantity: { type: Number, required: true },
    unitPrice: { type: Number, required: true },
    totalPrice: { type: Number, required: true }
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    shopKeeperId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    items: { type: [orderItemSchema], required: true },

    paymentType: {
      type: String,
      enum: ["full", "partial"],
      required: true
    },

    paymentMethodId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PaymentMethod",
      required: true
    },

    totalAmount: { type: Number, required: true },
    amountPaid: { type: Number, required: true, default: 0 },
    amountDue: { type: Number, required: true, default: 0 },

    orderDate: { type: Date, required: true },
    deliveryDate: { type: Date, required: true },

    status: {
      type: String,
      enum: ["pending", "confirmed", "rejected", "delivered", "cancelled"],
      default: "pending"
    },

    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, 
    approvedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);

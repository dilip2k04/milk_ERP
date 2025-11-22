const mongoose = require("mongoose");

const milkSessionSchema = new mongoose.Schema(
  {
    date: { type: Date, required: true },
    shift: { type: String, enum: ["morning", "evening"], required: true },
    totalEntries: { type: Number, default: 0 },
    totalLiters: { type: Number, default: 0 },
    totalAmount: { type: Number, default: 0 },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
  },
  { timestamps: true }
);

milkSessionSchema.index({ date: 1, shift: 1 });

module.exports = mongoose.model("MilkSession", milkSessionSchema);

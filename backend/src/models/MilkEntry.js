const mongoose = require("mongoose");

const milkEntrySchema = new mongoose.Schema(
  {
    sessionId: { type: mongoose.Schema.Types.ObjectId, ref: "MilkSession", required: true },
    farmerId: { type: mongoose.Schema.Types.ObjectId, ref: "Farmer", required: true },
    fat: Number,
    snf: Number,
    clr: Number,
    water: Number,
    liters: { type: Number, required: true },
    rate: { type: Number, required: true },
    amount: { type: Number, required: true }
  },
  { timestamps: true }
);

milkEntrySchema.index({ sessionId: 1 });
milkEntrySchema.index({ farmerId: 1 });

module.exports = mongoose.model("MilkEntry", milkEntrySchema);

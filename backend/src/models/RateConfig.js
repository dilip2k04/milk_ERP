const mongoose = require("mongoose");

const rateConfigSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    baseRate: { type: Number, required: true },
    rateSlabs: [
      {
        fatMin: Number,
        fatMax: Number,
        snfMin: Number,
        snfMax: Number,
        waterMin: Number,
        waterMax: Number,
        rate: Number
      }
    ],
    effectiveFrom: { type: Date, required: true },
    effectiveTo: Date,
    isActive: { type: Boolean, default: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("RateConfig", rateConfigSchema);

const mongoose = require("mongoose");

const rateSchema = new mongoose.Schema(
  {
    currentRate: {
      type: Number,
      required: true,
      default: 3,
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Rate", rateSchema);

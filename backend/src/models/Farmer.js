const mongoose = require("mongoose");

const farmerSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", unique: true, required: true },
    farmerCode: { type: String, required: true, unique: true },
    collectionCenter: { type: String, required: true },

    qualityMetrics: {
      avgFat: Number,
      avgSNF: Number,
      avgCLR: Number,
      avgWater: Number,
      consistencyScore: Number
    },

    financials: {
      totalOutstanding: { type: Number, default: 0 },
      totalEarnings: { type: Number, default: 0 },
      lastPaymentDate: Date,
      lastPaymentAmount: Number
    },

    preferences: {
      paymentMethod: { type: String, enum: ["cash", "gpay"], default: "cash" },
      paymentCycle: {
        type: String,
        enum: ["daily", "weekly", "biweekly", "monthly"],
        default: "weekly"
      }
    },

    status: { type: String, enum: ["active", "inactive", "suspended"], default: "active" },
    joinedDate: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

farmerSchema.index({ farmerCode: 1 });

module.exports = mongoose.model("Farmer", farmerSchema);

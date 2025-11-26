// models/MilkEntry.js
const mongoose = require("mongoose");

const milkEntrySchema = new mongoose.Schema({
  sessionId: { type: String, required: true },
  farmerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  liters: { type: Number, required: true },
  fat: { type: Number, default: 0 },
  snf: { type: Number, default: 0 },
  water: { type: Number, default: 0 },
  rate: { type: Number, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
}, { timestamps: true });

module.exports = mongoose.model("MilkEntry", milkEntrySchema);
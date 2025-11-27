const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
  {
    shopKeeperId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    address: String
  },
  { timestamps: true }
);

customerSchema.index({ shopKeeperId: 1 });

module.exports = mongoose.model("Customer", customerSchema);

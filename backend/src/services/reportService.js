const MilkEntry = require("../models/MilkEntry");
const Order = require("../models/Order");
const Payment = require("../models/Payment");
const Farmer = require("../models/Farmer");

const reportService = {
  async milkReport() {
    const totalLiters = await MilkEntry.aggregate([
      { $group: { _id: null, total: { $sum: "$liters" } } }
    ]);

    return { totalLiters: totalLiters[0]?.total || 0 };
  },

  async financeReport() {
    const farmerPaid = await Payment.aggregate([
      { $match: { type: "farmer_payout" } },
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);

    const shopReceived = await Payment.aggregate([
      { $match: { type: "shopkeeper_receipt" } },
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);

    return {
      totalPaidToFarmers: farmerPaid[0]?.total || 0,
      totalReceivedFromShops: shopReceived[0]?.total || 0
    };
  },

  async salesReport() {
    const sales = await Order.aggregate([
      { $match: { status: "approved" } },
      { $group: { _id: null, total: { $sum: "$paidAmount" } } }
    ]);

    return { totalSales: sales[0]?.total || 0 };
  },

  async farmerReport() {
    const farmers = await Farmer.find();
    return farmers;
  }
};

module.exports = reportService;

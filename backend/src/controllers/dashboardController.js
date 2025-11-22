// src/controllers/dashboardController.js

const asyncHandler = require("../middleware/asyncHandler");
const MilkEntry = require("../models/MilkEntry");
const MilkUsage = require("../models/MilkUsage");
const ProductStock = require("../models/ProductStock");
const Order = require("../models/Order");
const Payment = require("../models/Payment");
const Farmer = require("../models/Farmer");

exports.getAdminDashboard = asyncHandler(async (req, res) => {
  // total milk received
  const totalMilkAgg = await MilkEntry.aggregate([
    { $group: { _id: null, totalLiters: { $sum: "$liters" } } }
  ]);

  const totalMilkReceived = totalMilkAgg[0]?.totalLiters || 0;

  // total milk used
  const totalUsedAgg = await MilkUsage.aggregate([
    { $group: { _id: null, totalLiters: { $sum: "$litersUsed" } } }
  ]);

  const totalMilkUsed = totalUsedAgg[0]?.totalLiters || 0;

  // product stock summary
  const productStocks = await ProductStock.find().populate("productId");

  // pending orders
  const pendingOrdersCount = await Order.countDocuments({ status: "pending" });

  // totals: farmer outstanding & shopkeeper dues
  const farmers = await Farmer.find();
  const totalFarmerOutstanding = farmers.reduce(
    (sum, f) => sum + (f.financials?.totalOutstanding || 0),
    0
  );

  const approvedOrders = await Order.find({ status: "approved" });
  const totalShopkeeperDues = approvedOrders.reduce(
    (sum, o) => sum + (o.balance || 0),
    0
  );

  // payments summary
  const farmerPaidAgg = await Payment.aggregate([
    { $match: { type: "farmer_payout" } },
    { $group: { _id: null, total: { $sum: "$amount" } } }
  ]);

  const shopReceivedAgg = await Payment.aggregate([
    { $match: { type: "shopkeeper_receipt" } },
    { $group: { _id: null, total: { $sum: "$amount" } } }
  ]);

  res.json({
    totalMilkReceived,
    totalMilkUsed,
    remainingMilk: totalMilkReceived - totalMilkUsed,
    productStocks,
    pendingOrdersCount,
    totalFarmerOutstanding,
    totalShopkeeperDues,
    totalPaidToFarmers: farmerPaidAgg[0]?.total || 0,
    totalReceivedFromShops: shopReceivedAgg[0]?.total || 0
  });
});

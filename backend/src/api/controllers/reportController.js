// src/controllers/reportController.js

const asyncHandler = require("../../core/middleware/asyncHandler");
const reportService = require("../../core/services/reportService");

exports.getMilkReport = asyncHandler(async (req, res) => {
  const data = await reportService.milkReport();
  res.json(data);
});

exports.getFinanceReport = asyncHandler(async (req, res) => {
  const data = await reportService.financeReport();
  res.json(data);
});

exports.getSalesReport = asyncHandler(async (req, res) => {
  const data = await reportService.salesReport();
  res.json(data);
});

exports.getFarmerReport = asyncHandler(async (req, res) => {
  const data = await reportService.farmerReport();
  res.json(data);
});

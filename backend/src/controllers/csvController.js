// src/controllers/csvController.js

const asyncHandler = require("../middleware/asyncHandler");
const csvParserService = require("../services/csvParserService");
const MilkEntry = require("../models/MilkEntry");
const MilkSession = require("../models/MilkSession");
const { unlinkSync } = require("fs");

exports.uploadMilkCSV = asyncHandler(async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "CSV file is required" });
  }

  const { sessionId } = req.body;

  const session = await MilkSession.findById(sessionId);
  if (!session) {
    unlinkSync(req.file.path);
    return res.status(400).json({ message: "Invalid milk session" });
  }

  const rows = await csvParserService.parseCSV(req.file.path);
  const result = await csvParserService.processMilkRows(rows, sessionId);

  // persist success rows as MilkEntry
  if (result.success.length > 0) {
    await MilkEntry.insertMany(result.success);

    // update session summary
    const totalLiters = result.success.reduce((sum, r) => sum + r.liters, 0);
    const totalAmount = result.success.reduce((sum, r) => sum + r.amount, 0);

    session.totalEntries += result.success.length;
    session.totalLiters += totalLiters;
    session.totalAmount += totalAmount;
    await session.save();
  }

  // remove temp file
  unlinkSync(req.file.path);

  res.json({
    importedCount: result.success.length,
    skippedCount: result.failed.length,
    skipped: result.failed
  });
});

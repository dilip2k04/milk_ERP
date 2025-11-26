// src/controllers/csvController.js
const fs = require("fs");
const User = require("../models/User");
const MilkEntry = require("../models/MilkEntry");
const { parseMilkFile } = require("../services/csvParserService");
const { getActiveRateConfig, calculatePrice } = require("../services/milkRateEngine");

// Helper: parse date from CSV
function parseDate(value) {
  if (!value) return null;

  // If numeric Excel date
  if (!isNaN(value) && typeof value !== "string") {
    // crude excel numeric date support, can be improved
    const excelEpoch = new Date(Date.UTC(1899, 11, 30));
    const d = new Date(excelEpoch.getTime() + value * 24 * 60 * 60 * 1000);
    return d;
  }

  const d = new Date(value);
  if (isNaN(d.getTime())) return null;
  return d;
}

// -----------------------------
// Admin: Upload Milk Entries File
// POST /api/csv/milk-entries/upload
// -----------------------------
exports.importMilkEntries = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "File is required" });
  }

  const uploadedBy = req.user._id;
  const filePath = req.file.path;

  try {
    // parse file rows
    const rows = await parseMilkFile(filePath);

    if (!rows || rows.length === 0) {
      return res.status(400).json({ message: "No rows found in file" });
    }

    // get active rate
    const rateConfig = await getActiveRateConfig();
    if (!rateConfig) {
      return res.status(400).json({
        message: "No active rate config found. Set rate first.",
      });
    }

    const rateValue = rateConfig.rate; // from RateConfig model

    // collect all phones in file for batching
    const phoneSet = new Set();
    rows.forEach((r) => {
      const phone =
        (r.phone || r.Phone || r.PHONE || r.mobile || r.code || "").toString().trim();
      if (phone) phoneSet.add(phone);
    });

    const phones = Array.from(phoneSet);

    // fetch all farmers with those phone numbers
    const farmers = await User.find({ phone: { $in: phones } });
    const farmerByPhone = {};
    farmers.forEach((u) => {
      if (u.phone) farmerByPhone[u.phone.toString()] = u;
    });

    const entriesToInsert = [];
    const skipped = [];

    rows.forEach((row, index) => {
      const phoneRaw =
        (row.phone || row.Phone || row.PHONE || row.mobile || row.code || "").toString().trim();

      if (!phoneRaw) {
        skipped.push({ index, reason: "Missing phone", row });
        return;
      }

      const farmer = farmerByPhone[phoneRaw];
      if (!farmer) {
        skipped.push({ index, reason: `Farmer not found for phone ${phoneRaw}`, row });
        return;
      }

      const liters = Number(row.liters || row.Liters || row.qty || row.quantity || 0);
      const fat = Number(row.fat || row.FAT || 0);
      const snf = Number(row.snf || row.SNF || 0);

      if (!liters || liters <= 0) {
        skipped.push({ index, reason: "Invalid liters", row });
        return;
      }

      const dateStr = row.date || row.Date || row.DATE;
      const date = parseDate(dateStr);
      if (!date) {
        skipped.push({ index, reason: "Invalid date", row });
        return;
      }

      const session =
        (row.session || row.Session || row.SESSION || "morning").toString().toLowerCase();

      const { pricePerLiter, totalAmount } = calculatePrice({
        fat,
        snf,
        liters,
        rateValue,
      });

      entriesToInsert.push({
        farmerId: farmer._id,
        session,
        date,
        quantityLiters: liters,
        fat,
        snf,
        rateValue,
        pricePerLiter,
        totalAmount,
        csvRowIndex: index + 1,
        raw: row,
        createdBy: uploadedBy,
      });
    });

    let insertedDocs = [];
    if (entriesToInsert.length > 0) {
      insertedDocs = await MilkEntry.insertMany(entriesToInsert);
    }

    // total stats
    const totalLiters = insertedDocs.reduce((sum, e) => sum + e.quantityLiters, 0);
    const totalAmount = insertedDocs.reduce((sum, e) => sum + e.totalAmount, 0);

    return res.json({
      success: true,
      message: "File processed",
      insertedCount: insertedDocs.length,
      skippedCount: skipped.length,
      totalLiters,
      totalAmount,
      skipped, // you can hide this in production
    });
  } catch (err) {
    console.error("Import milk entries error:", err);
    return res.status(500).json({ message: "Failed to process file" });
  } finally {
    // cleanup temp file
    fs.unlink(filePath, () => {});
  }
};

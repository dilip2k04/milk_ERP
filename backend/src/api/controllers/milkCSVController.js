const fs = require("fs");
const MilkEntry = require("../../database/models/MilkEntry");
const csvParserService = require("../../core/services/csvParserService");

exports.uploadMilkCSV = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "CSV file required" });

    const sessionId = req.body.sessionId;
    if (!sessionId) return res.status(400).json({ message: "sessionId required" });

    console.log("Processing CSV file:", req.file.originalname);
    
    const rows = await csvParserService.parseCSV(req.file.path);
    console.log(`Parsed ${rows.length} rows`);

    // Pass the authenticated user's ID to the service
    const processed = await csvParserService.processMilkRows(rows, sessionId, req.user._id);

    let inserted = [];
    if (processed.success.length > 0) {
      inserted = await MilkEntry.insertMany(processed.success);
      console.log(`Inserted ${inserted.length} milk entries`);
    }

    fs.unlink(req.file.path, () => {});

    return res.json({
      success: true,
      insertedCount: inserted.length,
      failedCount: processed.failed.length,
      failed: processed.failed,
    });
  } catch (err) {
    console.error("CSV upload error:", err);
    
    // Clean up file on error too
    if (req.file && req.file.path) {
      fs.unlink(req.file.path, () => {});
    }
    
    return res.status(500).json({ 
      message: "CSV processing failed",
      error: err.message 
    });
  }
};
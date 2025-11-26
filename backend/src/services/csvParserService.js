const csv = require("csv-parser");
const fs = require("fs");
const User = require("../models/User");
const milkRateEngine = require("./milkRateEngine");

const csvParserService = {
  parseCSV(filePath) {
    return new Promise((resolve, reject) => {
      const rows = [];

      fs.createReadStream(filePath)
        .pipe(csv())
        .on("data", (row) => rows.push(row))
        .on("end", () => resolve(rows))
        .on("error", reject);
    });
  },

  async processMilkRows(rows, sessionId, createdBy) {
    const results = {
      success: [],
      failed: [],
    };

    const rateConfig = await milkRateEngine.getActiveRateConfig();

    for (const row of rows) {
      // Handle multiple possible column names for phone
      const phone = row.phone || row.farmerCode || row.mobile || row.Phone || "";
      const liters = Number(row.liters || row.ltr || row.quantity || 0);
      const fat = Number(row.fat || row.Fat || row.FAT || 0);
      const snf = Number(row.snf || row.Snf || row.SNF || 0);
      const water = Number(row.water || row.Water || 0);

      if (!phone) {
        results.failed.push({
          row,
          reason: "Missing phone/farmerCode",
        });
        continue;
      }

      // Find user with role "farmer" by phone
      const farmer = await User.findOne({
        phone: phone.trim(),
        role: "farmer",
        isActive: true
      });

      if (!farmer) {
        results.failed.push({
          row,
          reason: `Farmer with phone: ${phone} not found or not active`,
        });
        continue;
      }

      const rate = milkRateEngine.calculateRate({ fat, snf, water }, rateConfig);
      const amount = milkRateEngine.calculateAmount(liters, rate);

      results.success.push({
        sessionId,
        farmerId: farmer._id,
        liters,
        fat,
        snf,
        water,
        rate,
        amount,
        date: new Date(),
        createdBy: createdBy
      });
    }

    return results;
  }
};

module.exports = csvParserService;
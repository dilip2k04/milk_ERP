const csv = require("csv-parser");
const fs = require("fs");
const Farmer = require("../models/Farmer");
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

  async processMilkRows(rows, sessionId) {
    const FarmerModel = Farmer;

    const results = {
      success: [],
      failed: []
    };

    const rateConfig = await milkRateEngine.getActiveRateConfig();

    for (const row of rows) {
      const farmerCode = row.farmerCode?.trim();
      const liters = Number(row.liters || 0);

      const fat = Number(row.fat || 0);
      const snf = Number(row.snf || 0);
      const water = Number(row.water || 0);

      const farmer = await FarmerModel.findOne({ farmerCode });

      if (!farmer) {
        results.failed.push({
          row,
          reason: "Farmer ID not in system — skipped"
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
        amount
      });
    }

    return results;
  }
};

module.exports = csvParserService;

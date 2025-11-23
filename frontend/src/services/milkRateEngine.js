const RateConfig = require("../models/RateConfig");

const milkRateEngine = {
  async getActiveRateConfig() {
    return await RateConfig.findOne({ isActive: true }).sort({
      effectiveFrom: -1
    });
  },

  calculateRate(entry, rateConfig) {
    let rate = rateConfig.baseRate;

    // Find matching slab
    const slab = rateConfig.rateSlabs.find((s) => {
      return (
        entry.fat >= s.fatMin &&
        entry.fat <= s.fatMax &&
        entry.snf >= s.snfMin &&
        entry.snf <= s.snfMax &&
        entry.water >= s.waterMin &&
        entry.water <= s.waterMax
      );
    });

    if (slab) {
      rate = slab.rate;
    }

    return rate;
  },

  calculateAmount(liters, rate) {
    return liters * rate;
  }
};

module.exports = milkRateEngine;

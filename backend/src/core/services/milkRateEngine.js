const Rate = require("../../database/models/Rate");

module.exports = {
  async getActiveRateConfig() {
    // Since Rate model doesn't have isActive, just get the latest one
    let config = await Rate.findOne().sort({ createdAt: -1 });

    if (!config) {
      // Create default rate if none exists
      config = await Rate.create({
        currentRate: 1,
        updatedBy: null // or some default user
      });
    }

    return { rate: config.currentRate }; // Return in expected format
  },

  calculateRate({ fat, snf, water }, rateConfig) {
    const r = Number(rateConfig.rate || 0);
    return (Number(fat) + Number(snf)) * r;
  },

  calculateAmount(liters, rate) {
    return Number(liters) * Number(rate);
  }
};
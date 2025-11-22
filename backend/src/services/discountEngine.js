const DiscountConfig = require("../models/DiscountConfig");

const discountEngine = {
  async applyDiscount(shopKeeperId, productId, amount) {
    const config = await DiscountConfig.findOne({ isActive: true });
    if (!config) return 0;

    if (config.discountType === "percentage") {
      return (amount * config.discountValue) / 100;
    }

    if (config.discountType === "fixed_amount") {
      return config.discountValue;
    }

    return 0;
  }
};

module.exports = discountEngine;

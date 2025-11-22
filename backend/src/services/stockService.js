const ProductStock = require("../models/ProductStock");
const Product = require("../models/Product");

const stockService = {
  async ensureStockExists(productId) {
    let stock = await ProductStock.findOne({ productId });
    if (!stock) stock = await ProductStock.create({ productId, quantity: 0 });
    return stock;
  },

  async addStock(productId, qty) {
    const stock = await this.ensureStockExists(productId);
    stock.quantity += qty;
    await stock.save();
    return stock;
  },

  async deductStock(productId, qty) {
    const stock = await this.ensureStockExists(productId);

    if (stock.quantity < qty) {
      throw new Error(`Not enough stock for product ${productId}`);
    }

    stock.quantity -= qty;
    await stock.save();

    return stock;
  }
};

module.exports = stockService;

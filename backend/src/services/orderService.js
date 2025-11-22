const Order = require("../models/Order");
const Product = require("../models/Product");
const stockService = require("./stockService");
const discountEngine = require("./discountEngine");
const { ORDER_STATUSES } = require("../config/appConfig");

const orderService = {
  async createOrder(data) {
    const product = await Product.findById(data.productId);
    if (!product) throw new Error("Product not found");

    const price = product.price * data.quantity;

    const discount = await discountEngine.applyDiscount(
      data.shopKeeperId,
      product._id,
      price
    );

    const finalAmount = price - discount;

    // If partial, balance = final - paidAmount
    const balance =
      data.paymentType === "partial"
        ? finalAmount - data.paidAmount
        : 0;

    const order = await Order.create({
      ...data,
      discountApplied: discount,
      balance,
      status: ORDER_STATUSES.PENDING
    });

    return order;
  },

  async approveOrder(orderId) {
    const order = await Order.findById(orderId);
    if (!order) throw new Error("Order not found");

    if (order.status !== ORDER_STATUSES.PENDING) {
      throw new Error("Order already processed");
    }

    await stockService.deductStock(order.productId, order.quantity);

    order.status = ORDER_STATUSES.APPROVED;
    await order.save();

    return order;
  },

  async cancelOrder(orderId, role) {
    const order = await Order.findById(orderId);
    if (!order) throw new Error("Order not found");

    if (role === "shop_keeper" && order.status !== "pending") {
      throw new Error("Cannot cancel after approval");
    }

    order.status = ORDER_STATUSES.CANCELLED;
    await order.save();

    return order;
  }
};

module.exports = orderService;

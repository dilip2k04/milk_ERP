const Payment = require("../models/Payment");
const Farmer = require("../models/Farmer");
const Order = require("../models/Order");

const paymentService = {
  async payFarmer(farmerId, amount, mode, adminId) {
    const farmer = await Farmer.findById(farmerId);
    if (!farmer) throw new Error("Farmer not found");

    await Payment.create({
      type: "farmer_payout",
      farmerId,
      amount,
      mode,
      createdBy: adminId
    });

    farmer.financials.totalOutstanding -= amount;
    farmer.financials.lastPayment = amount;
    farmer.financials.lastPaymentDate = new Date();
    await farmer.save();
  },

  async recordShopkeeperPayment(shopKeeperId, amount, paymentMethodId, adminId) {
    await Payment.create({
      type: "shopkeeper_receipt",
      shopKeeperId,
      amount,
      paymentMethodId,
      createdBy: adminId
    });

    // Reduce dues for all approved orders
    const orders = await Order.find({
      shopKeeperId,
      status: "approved",
      balance: { $gt: 0 }
    }).sort({ createdAt: 1 });

    let remaining = amount;

    for (const order of orders) {
      if (remaining <= 0) break;

      if (remaining >= order.balance) {
        remaining -= order.balance;
        order.balance = 0;
      } else {
        order.balance -= remaining;
        remaining = 0;
      }
      await order.save();
    }
  }
};

module.exports = paymentService;

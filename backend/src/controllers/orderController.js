const Order = require("../models/Order");
const Product = require("../models/Product");
const PaymentMethod = require("../models/PaymentMethod");
const User = require("../models/User");

// -------------------- SHOPKEEPER: CREATE ORDER --------------------
exports.createOrder = async (req, res, next) => {
  try {
    const shopKeeperId = req.user.uid_mongo;

    let {
      items,
      paymentType,
      paymentMode,
      amountPaid,
      orderDate,
      deliveryDate,
    } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "Order items required" });
    }

    // Fetch product prices & calculate totals
    let populatedItems = [];
    let totalAmount = 0;

    for (const i of items) {
      const p = await Product.findById(i.productId);
      if (!p) return res.status(400).json({ message: "Product not found" });

      const totalPrice = Number(p.price || 0) * Number(i.quantity || 0);
      totalAmount += totalPrice;

      populatedItems.push({
        productId: p._id,
        productName: p.name,
        quantity: i.quantity,
        unitPrice: p.price,
        totalPrice,
      });
    }

    if (paymentType === "full") {
      amountPaid = totalAmount;
    }

    const amountDue = totalAmount - Number(amountPaid || 0);

    const order = await Order.create({
      shopKeeperId,
      items: populatedItems,
      paymentType,
      paymentMode,
      totalAmount,
      amountPaid: amountPaid || 0,
      amountDue,
      orderDate,
      deliveryDate,
      createdBy: shopKeeperId,
    });

    res.status(201).json(order);
  } catch (err) {
    next(err);
  }
};


// -------------------- SHOPKEEPER: CANCEL BEFORE APPROVAL --------------------

exports.shopKeeperCancel = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) return res.status(404).json({ message: "Order not found" });

    // Ensure only the owner can cancel
    if (order.shopKeeperId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not allowed" });
    }

    // Can cancel only if pending
    if (order.status !== "pending") {
      return res.status(400).json({
        message: "Cannot cancel orders that are already approved or processed"
      });
    }

    order.status = "cancelled";
    await order.save();

    res.json({ success: true, message: "Order cancelled successfully", data: order });

  } catch (err) {
    console.error("Cancel Order Error:", err);
    res.status(500).json({ message: "Failed to cancel order" });
  }
};



// -------------------- SHOPKEEPER: DELETE BEFORE APPROVAL --------------------
exports.shopKeeperDelete = async (req, res, next) => {
  try {
    const shopKeeperId = req.user.uid_mongo;
    const order = await Order.findById(req.params.id);

    if (!order) return res.status(404).json({ message: "Order not found" });

    if (order.shopKeeperId.toString() !== shopKeeperId.toString()) {
      return res.status(403).json({ message: "Not your order" });
    }

    if (order.status !== "pending") {
      return res
        .status(400)
        .json({ message: "Cannot delete order after approval" });
    }

    await order.deleteOne();
    res.json({ message: "Order deleted" });
  } catch (err) {
    next(err);
  }
};


// -------------------- ADMIN: GET ALL ORDERS --------------------
exports.getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find().populate("shopKeeperId", "name phone");
    res.json(orders);
  } catch (err) {
    next(err);
  }
};


// -------------------- ADMIN: APPROVE ORDER --------------------
exports.approveOrder = async (req, res, next) => {
  try {
    const adminId = req.user.uid_mongo;

    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    if (order.status !== "pending") {
      return res.status(400).json({ message: "Order already processed" });
    }

    order.status = "confirmed";
    order.approvedBy = adminId;
    await order.save();

    res.json({ message: "Order approved", order });
  } catch (err) {
    next(err);
  }
};


// -------------------- ADMIN: REJECT ORDER --------------------
exports.rejectOrder = async (req, res, next) => {
  try {
    const adminId = req.user.uid_mongo;

    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    if (order.status !== "pending") {
      return res.status(400).json({ message: "Order already processed" });
    }

    order.status = "rejected";
    order.approvedBy = adminId;
    await order.save();

    res.json({ message: "Order rejected", order });
  } catch (err) {
    next(err);
  }
};


// -------------------- ADMIN: MARK AS DELIVERED --------------------
exports.markDelivered = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    if (order.status !== "confirmed") {
      return res
        .status(400)
        .json({ message: "Order must be confirmed before delivery" });
    }

    order.status = "delivered";
    await order.save();

    res.json({ message: "Order delivered", order });
  } catch (err) {
    next(err);
  }
};


// -------------------- ADMIN: DELETE ANY ORDER --------------------
exports.deleteOrder = async (req, res, next) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.json({ message: "Order deleted by admin" });
  } catch (err) {
    next(err);
  }
};

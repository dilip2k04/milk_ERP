const Order = require("../../database/models/Order");
const Product = require("../../database/models/Product");
const PaymentMethod = require("../../database/models/PaymentMethod");

// -------------------------------------------------------
// SHOPKEEPER: CREATE ORDER
// -------------------------------------------------------
exports.createOrder = async (req, res, next) => {
  try {
    const shopKeeperId = req.user._id;

    let {
      items,
      paymentType,
      paymentMethodId,
      amountPaid,
      orderDate,
      deliveryDate,
    } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "Order items required" });
    }

    if (!paymentMethodId) {
      return res.status(400).json({ message: "Payment method required" });
    }

    let populatedItems = [];
    let totalAmount = 0;

    for (const i of items) {
      const p = await Product.findById(i.productId);
      if (!p) return res.status(400).json({ message: "Product not found" });

      const totalPrice = p.price * i.quantity;
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
      paymentMethodId,
      totalAmount,
      amountPaid: amountPaid || 0,
      amountDue,
      orderDate,
      deliveryDate,
      createdBy: shopKeeperId,
      status: "pending"
    });

    res.status(201).json({ success: true, data: order });
  } catch (err) {
    next(err);
  }
};

// -------------------------------------------------------
// SHOPKEEPER: GET MY ORDERS
// -------------------------------------------------------
exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ shopKeeperId: req.user._id })
      .populate("paymentMethodId", "name")
      .sort({ createdAt: -1 });

    return res.json({ success: true, data: orders });
  } catch (err) {
    console.error("Get my orders error:", err);
    res.status(500).json({ message: "Failed to load orders" });
  }
};

// -------------------------------------------------------
// SHOPKEEPER: CANCEL BEFORE APPROVAL
// -------------------------------------------------------
exports.shopKeeperCancel = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) return res.status(404).json({ message: "Order not found" });

    if (order.shopKeeperId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not allowed" });
    }

    if (order.status !== "pending") {
      return res
        .status(400)
        .json({ message: "Only pending orders can be cancelled" });
    }

    order.status = "cancelled";
    await order.save();

    res.json({ success: true, message: "Order cancelled", data: order });
  } catch (err) {
    res.status(500).json({ message: "Failed to cancel order" });
  }
};

// -------------------------------------------------------
// SHOPKEEPER: DELETE BEFORE APPROVAL
// -------------------------------------------------------
exports.shopKeeperDelete = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) return res.status(404).json({ message: "Order not found" });

    if (order.shopKeeperId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not allowed" });
    }

    if (order.status !== "pending") {
      return res
        .status(400)
        .json({ message: "Cannot delete non-pending orders" });
    }

    await order.deleteOne();
    res.json({ success: true, message: "Order deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete order" });
  }
};

// -------------------------------------------------------
// ADMIN: GET ALL ORDERS
// -------------------------------------------------------
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("shopKeeperId", "name phone")
      .populate("paymentMethodId", "name")
      .sort({ createdAt: -1 });

    res.json({ success: true, data: orders });
  } catch (err) {
    res.status(500).json({ message: "Failed to load orders" });
  }
};

// -------------------------------------------------------
// ADMIN: APPROVE ORDER
// -------------------------------------------------------
exports.approveOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    if (order.status !== "pending") {
      return res.status(400).json({ message: "Order already processed" });
    }

    order.status = "confirmed";
    order.approvedBy = req.user._id;
    await order.save();

    res.json({ success: true, message: "Order approved", order });
  } catch (err) {
    res.status(500).json({ message: "Failed to approve order" });
  }
};

// -------------------------------------------------------
// ADMIN: REJECT ORDER
// -------------------------------------------------------
exports.rejectOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    if (order.status !== "pending") {
      return res.status(400).json({ message: "Order already processed" });
    }

    order.status = "rejected";
    order.approvedBy = req.user._id;
    await order.save();

    res.json({ success: true, message: "Order rejected", order });
  } catch (err) {
    res.status(500).json({ message: "Failed to reject order" });
  }
};

// -------------------------------------------------------
// ADMIN: MARK DELIVERED
// -------------------------------------------------------
exports.markDelivered = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) return res.status(404).json({ message: "Order not found" });

    if (order.status !== "confirmed") {
      return res
        .status(400)
        .json({ message: "Order must be confirmed first" });
    }

    order.status = "delivered";
    await order.save();

    res.json({ success: true, message: "Order delivered", order });
  } catch (err) {
    res.status(500).json({ message: "Failed to update order" });
  }
};

// -------------------------------------------------------
// ADMIN: DELETE ORDER
// -------------------------------------------------------
exports.deleteOrder = async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Order deleted by admin" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete order" });
  }
};

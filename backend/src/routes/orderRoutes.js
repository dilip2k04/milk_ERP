const express = require("express");
const router = express.Router();
const authFirebase = require("../middleware/authFirebase");
const { requireRoles } = require("../middleware/rbac");
const ctrl = require("../controllers/orderController");

// All order routes require login
router.use(authFirebase);

// SHOPKEEPER FEATURES
router.get("/my", requireRoles(["shop_keeper"]), ctrl.getMyOrders);
router.post("/", requireRoles(["shop_keeper"]), ctrl.createOrder);
router.patch("/:id/cancel", requireRoles(["shop_keeper"]), ctrl.shopKeeperCancel);
router.delete("/:id", requireRoles(["shop_keeper"]), ctrl.shopKeeperDelete);

// ADMIN FEATURES
router.get("/", requireRoles(["admin"]), ctrl.getOrders);
router.patch("/:id/approve", requireRoles(["admin"]), ctrl.approveOrder);
router.patch("/:id/reject", requireRoles(["admin"]), ctrl.rejectOrder);
router.patch("/:id/deliver", requireRoles(["admin"]), ctrl.markDelivered);
router.delete("/:id/admin", requireRoles(["admin"]), ctrl.deleteOrder);

module.exports = router;

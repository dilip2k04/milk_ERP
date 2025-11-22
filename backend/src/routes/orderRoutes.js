const express = require("express");
const router = express.Router();
const authFirebase = require("../middleware/authFirebase");
const { requireRoles } = require("../middleware/rbac");
const ctrl = require("../controllers/orderController");

router.use(authFirebase);

// Shop Keeper Create Order
router.post("/", requireRoles(["shop_keeper"]), ctrl.createOrder);

// Shop Keeper Cancel/ Delete Before Approval
router.patch("/:id/cancel", requireRoles(["shop_keeper"]), ctrl.shopKeeperCancel);
router.delete("/:id", requireRoles(["shop_keeper"]), ctrl.shopKeeperDelete);

// Admin Management
router.get("/", requireRoles(["admin"]), ctrl.getOrders);
router.patch("/:id/approve", requireRoles(["admin"]), ctrl.approveOrder);
router.patch("/:id/reject", requireRoles(["admin"]), ctrl.rejectOrder);
router.patch("/:id/deliver", requireRoles(["admin"]), ctrl.markDelivered);
router.delete("/:id/admin", requireRoles(["admin"]), ctrl.deleteOrder);

module.exports = router;

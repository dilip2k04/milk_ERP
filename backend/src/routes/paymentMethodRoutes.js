const express = require("express");
const router = express.Router();
const authFirebase = require("../middleware/authFirebase");
const { requireRoles } = require("../middleware/rbac");

const {
  createPaymentMethod,
  getPaymentMethods,
  getPaymentMethodById,
  updatePaymentMethod,
  deletePaymentMethod
} = require("../controllers/paymentMethodController");

/**
 * 🟢 Allow ALL authenticated roles to view payment methods
 * (needed for ShopKeeper Orders)
 */
router.get("/", authFirebase, getPaymentMethods);
router.get("/:id", authFirebase, getPaymentMethodById);

/**
 * 🔒 Only Admin can MODIFY payment methods
 */
router.post("/", authFirebase, requireRoles(["admin"]), createPaymentMethod);
router.patch("/:id", authFirebase, requireRoles(["admin"]), updatePaymentMethod);
router.put("/:id", authFirebase, requireRoles(["admin"]), updatePaymentMethod);
router.delete("/:id", authFirebase, requireRoles(["admin"]), deletePaymentMethod);

module.exports = router;

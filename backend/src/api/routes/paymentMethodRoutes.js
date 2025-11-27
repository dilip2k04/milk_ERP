const express = require("express");
const router = express.Router();

const authFirebase = require("../../core/middleware/authFirebase");
const { requireRoles } = require("../../core/middleware/rbac");

const {
  createPaymentMethod,
  getPaymentMethods,
  getPaymentMethodById,
  updatePaymentMethod,
  deletePaymentMethod,
} = require("../controllers/paymentMethodController");

/**
 * 🟢 All authenticated roles can VIEW
 */
router.get("/", authFirebase, getPaymentMethods);
router.get("/:id", authFirebase, getPaymentMethodById);

/**
 * 🔒 Only ADMIN can MODIFY
 */
router.post("/", authFirebase, requireRoles(["admin"]), createPaymentMethod);
router.patch("/:id", authFirebase, requireRoles(["admin"]), updatePaymentMethod);
router.put("/:id", authFirebase, requireRoles(["admin"]), updatePaymentMethod);
router.delete("/:id", authFirebase, requireRoles(["admin"]), deletePaymentMethod);

module.exports = router;

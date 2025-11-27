const express = require("express");
const router = express.Router();

const authFirebase = require("../../core/middleware/authFirebase");
const { requireRoles } = require("../../core/middleware/rbac");
const validate = require("../../core/middleware/validate");

const {
  createPaymentMethodSchema,
  updatePaymentMethodSchema
} = require("../validators/paymentMethodValidator");

const {
  createPaymentMethod,
  getPaymentMethods,
  getPaymentMethodById,
  updatePaymentMethod,
  deletePaymentMethod,
} = require("../controllers/paymentMethodController");

// Read: all authenticated
router.get("/", authFirebase, getPaymentMethods);
router.get("/:id", authFirebase, getPaymentMethodById);

// Admin modify
router.post("/", authFirebase, requireRoles(["admin"]), validate(createPaymentMethodSchema), createPaymentMethod);
router.patch("/:id", authFirebase, requireRoles(["admin"]), validate(updatePaymentMethodSchema), updatePaymentMethod);
router.put("/:id", authFirebase, requireRoles(["admin"]), validate(updatePaymentMethodSchema), updatePaymentMethod);
router.delete("/:id", authFirebase, requireRoles(["admin"]), deletePaymentMethod);

module.exports = router;

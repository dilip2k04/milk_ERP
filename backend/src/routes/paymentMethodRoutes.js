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

const allowedRoles = ["admin"];

router.use(authFirebase, requireRoles(allowedRoles));

router.post("/", createPaymentMethod);
router.get("/", getPaymentMethods);
router.get("/:id", getPaymentMethodById);
router.patch("/:id", updatePaymentMethod);
router.delete("/:id", deletePaymentMethod);

module.exports = router;

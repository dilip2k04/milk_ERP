const express = require("express");
const router = express.Router();

const authFirebase = require("../../core/middleware/authFirebase");
const { requireRoles } = require("../../core/middleware/rbac");
const validate = require("../../core/middleware/validate");

const {
  createPaymentSchema,
  updatePaymentSchema
} = require("../validators/paymentValidator");

const {
  createPayment,
  getPayments,
  getPaymentById,
  updatePayment,
  deletePayment
} = require("../controllers/paymentController");

router.use(authFirebase, requireRoles(["admin"]));

router.post("/", validate(createPaymentSchema), createPayment);
router.get("/", getPayments);
router.get("/:id", getPaymentById);
router.patch("/:id", validate(updatePaymentSchema), updatePayment);
router.delete("/:id", deletePayment);

module.exports = router;

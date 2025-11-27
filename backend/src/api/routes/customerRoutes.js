const express = require("express");
const router = express.Router();
const authFirebase = require("../../core/middleware/authFirebase");
const { requireRoles } = require("../../core/middleware/rbac");
const validate = require("../../core/middleware/validate");
const {
  createCustomerSchema,
  updateCustomerSchema
} = require("../validators/customerValidator");

const {
  createCustomer,
  getCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer
} = require("../controllers/customerController");

router.use(authFirebase, requireRoles(["shop_keeper", "admin"]));

router.post("/", validate(createCustomerSchema), createCustomer);
router.get("/", getCustomers);
router.get("/:id", getCustomerById);
router.patch("/:id", validate(updateCustomerSchema), updateCustomer);
router.delete("/:id", deleteCustomer);

module.exports = router;

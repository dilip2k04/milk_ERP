const express = require("express");
const router = express.Router();

const authFirebase = require("../../core/middleware/authFirebase");
const { requireRoles } = require("../../core/middleware/rbac");
const validate = require("../../core/middleware/validate");

const {
  createProductSchema,
  updateProductSchema
} = require("../validators/productValidator");

const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

// Anyone authenticated can read
router.get("/", authFirebase, getProducts);
router.get("/:id", authFirebase, getProductById);

// Admin can modify
router.post("/", authFirebase, requireRoles(["admin"]), validate(createProductSchema), createProduct);
router.put("/:id", authFirebase, requireRoles(["admin"]), validate(updateProductSchema), updateProduct);
router.delete("/:id", authFirebase, requireRoles(["admin"]), deleteProduct);

module.exports = router;

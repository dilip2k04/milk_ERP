// src/routes/productRoutes.js
const express = require("express");
const router = express.Router();

const authFirebase = require("../middleware/authFirebase");
const { requireRoles } = require("../middleware/rbac");

const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

/**
 * 🟢 Allow ALL authenticated users to READ products
 */
router.get("/", authFirebase, getProducts);
router.get("/:id", authFirebase, getProductById);

/**
 * 🔒 Only Admins can modify products
 */
router.post("/", authFirebase, requireRoles(["admin"]), createProduct);
router.put("/:id", authFirebase, requireRoles(["admin"]), updateProduct);
router.delete("/:id", authFirebase, requireRoles(["admin"]), deleteProduct);

module.exports = router;

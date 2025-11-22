// src/routes/productTypeRoutes.js
const express = require("express");
const router = express.Router();

const authFirebase = require("../middleware/authFirebase");
const { requireRoles } = require("../middleware/rbac");
const {
  createProductType,
  getProductTypes,
  getProductTypeById,
  updateProductType,
  deleteProductType
} = require("../controllers/productTypeController");

// All product-type routes require admin
router.use(authFirebase, requireRoles(["admin"]));

router.post("/", createProductType);
router.get("/", getProductTypes);
router.get("/:id", getProductTypeById);
router.put("/:id", updateProductType);
router.delete("/:id", deleteProductType);

module.exports = router;

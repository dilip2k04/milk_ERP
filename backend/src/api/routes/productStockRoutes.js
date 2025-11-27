const express = require("express");
const router = express.Router();
const authFirebase = require("../../core/middleware/authFirebase");
const { requireRoles } = require("../../core/middleware/rbac");

const {
  createProductStock,
  getProductStocks,
  getProductStockById,
  updateProductStock,
  deleteProductStock
} = require("../controllers/productStockController");

const allowedRoles = ["admin"];

router.use(authFirebase, requireRoles(allowedRoles));

router.post("/", createProductStock);
router.get("/", getProductStocks);
router.get("/:id", getProductStockById);
router.patch("/:id", updateProductStock);
router.delete("/:id", deleteProductStock);

module.exports = router;

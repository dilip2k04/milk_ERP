const express = require("express");
const router = express.Router();

const authFirebase = require("../../core/middleware/authFirebase");
const { requireRoles } = require("../../core/middleware/rbac");
const validate = require("../../core/middleware/validate");

const {
  addStockSchema,
  updateStockSchema
} = require("../validators/stockValidator");

const {
  createProductStock,
  getProductStocks,
  getProductStockById,
  updateProductStock,
  deleteProductStock
} = require("../controllers/productStockController");

router.use(authFirebase, requireRoles(["admin"]));

router.post("/", validate(addStockSchema), createProductStock);
router.get("/", getProductStocks);
router.get("/:id", getProductStockById);
router.patch("/:id", validate(updateStockSchema), updateProductStock);
router.delete("/:id", deleteProductStock);

module.exports = router;

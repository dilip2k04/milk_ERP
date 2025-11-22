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

const allowedRoles = ["admin"];

router.use(authFirebase, requireRoles(allowedRoles));

router.post("/", createProductType);
router.get("/", getProductTypes);
router.get("/:id", getProductTypeById);
router.patch("/:id", updateProductType);
router.delete("/:id", deleteProductType);

module.exports = router;

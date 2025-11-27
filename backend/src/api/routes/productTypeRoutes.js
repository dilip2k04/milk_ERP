const express = require("express");
const router = express.Router();

const authFirebase = require("../../core/middleware/authFirebase");
const { requireRoles } = require("../../core/middleware/rbac");
const validate = require("../../core/middleware/validate");

const {
  createProductTypeSchema,
  updateProductTypeSchema
} = require("../validators/productTypeValidator");

const {
  createProductType,
  getProductTypes,
  getProductTypeById,
  updateProductType,
  deleteProductType
} = require("../controllers/productTypeController");

router.use(authFirebase, requireRoles(["admin"]));

router.post("/", validate(createProductTypeSchema), createProductType);
router.get("/", getProductTypes);
router.get("/:id", getProductTypeById);
router.put("/:id", validate(updateProductTypeSchema), updateProductType);
router.delete("/:id", deleteProductType);

module.exports = router;

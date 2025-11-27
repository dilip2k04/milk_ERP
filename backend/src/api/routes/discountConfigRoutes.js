const express = require("express");
const router = express.Router();
const authFirebase = require("../../core/middleware/authFirebase");
const { requireRoles } = require("../../core/middleware/rbac");
const validate = require("../../core/middleware/validate");
const {
  createDiscountSchema,
  updateDiscountSchema
} = require("../validators/discountConfigValidator");

const {
  createDiscountConfig,
  getDiscountConfigs,
  getDiscountConfigById,
  updateDiscountConfig,
  deleteDiscountConfig
} = require("../controllers/discountConfigController");

router.use(authFirebase, requireRoles(["admin"]));

router.post("/", validate(createDiscountSchema), createDiscountConfig);
router.get("/", getDiscountConfigs);
router.get("/:id", getDiscountConfigById);
router.patch("/:id", validate(updateDiscountSchema), updateDiscountConfig);
router.delete("/:id", deleteDiscountConfig);

module.exports = router;

const express = require("express");
const router = express.Router();
const authFirebase = require("../../core/middleware/authFirebase");
const { requireRoles } = require("../../core/middleware/rbac");

const {
  createDiscountConfig,
  getDiscountConfigs,
  getDiscountConfigById,
  updateDiscountConfig,
  deleteDiscountConfig
} = require("../controllers/discountConfigController");

const allowedRoles = ["admin"];

router.use(authFirebase, requireRoles(allowedRoles));

router.post("/", createDiscountConfig);
router.get("/", getDiscountConfigs);
router.get("/:id", getDiscountConfigById);
router.patch("/:id", updateDiscountConfig);
router.delete("/:id", deleteDiscountConfig);

module.exports = router;

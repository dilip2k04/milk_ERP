const express = require("express");
const router = express.Router();
const authFirebase = require("../../core/middleware/authFirebase");
const { requireRoles } = require("../../core/middleware/rbac");
const validate = require("../../core/middleware/validate");
const { createMilkUsageSchema } = require("../validators/milkUsageValidator");

const {
  createMilkUsage,
  getMilkUsages,
  getMilkUsageById,
  updateMilkUsage,
  deleteMilkUsage
} = require("../controllers/milkUsageController");

const allowedRoles = ["admin", "company"];

router.use(authFirebase, requireRoles(allowedRoles));

router.post("/", validate(createMilkUsageSchema), createMilkUsage);
router.get("/", getMilkUsages);
router.get("/:id", getMilkUsageById);
router.patch("/:id", updateMilkUsage);
router.delete("/:id", deleteMilkUsage);

module.exports = router;

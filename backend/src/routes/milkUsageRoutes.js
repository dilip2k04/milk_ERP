const express = require("express");
const router = express.Router();
const authFirebase = require("../middleware/authFirebase");
const { requireRoles } = require("../middleware/rbac");

const {
  createMilkUsage,
  getMilkUsages,
  getMilkUsageById,
  updateMilkUsage,
  deleteMilkUsage
} = require("../controllers/milkUsageController");

const allowedRoles = ["admin","company"];

router.use(authFirebase, requireRoles(allowedRoles));

router.post("/", createMilkUsage);
router.get("/", getMilkUsages);
router.get("/:id", getMilkUsageById);
router.patch("/:id", updateMilkUsage);
router.delete("/:id", deleteMilkUsage);

module.exports = router;

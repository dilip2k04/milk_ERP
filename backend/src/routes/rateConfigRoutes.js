const express = require("express");
const router = express.Router();
const authFirebase = require("../middleware/authFirebase");
const { requireRoles } = require("../middleware/rbac");

const {
  createRateConfig,
  getRateConfigs,
  getRateConfigById,
  updateRateConfig,
  deleteRateConfig
} = require("../controllers/rateConfigController");

const allowedRoles = ["admin"];

router.use(authFirebase, requireRoles(allowedRoles));

router.post("/", createRateConfig);
router.get("/", getRateConfigs);
router.get("/:id", getRateConfigById);
router.patch("/:id", updateRateConfig);
router.delete("/:id", deleteRateConfig);

module.exports = router;

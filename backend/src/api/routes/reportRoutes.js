// src/routes/reportRoutes.js

const express = require("express");
const router = express.Router();
const authFirebase = require("../../core/middleware/authFirebase");
const { requireRoles } = require("../../core/middleware/rbac");
const { ROLES } = require("../../config/appConfig");
const {
  getMilkReport,
  getFinanceReport,
  getSalesReport,
  getFarmerReport
} = require("../controllers/reportController");

router.use(authFirebase, requireRoles([ROLES.ADMIN]));

router.get("/milk", getMilkReport);
router.get("/finance", getFinanceReport);
router.get("/sales", getSalesReport);
router.get("/farmers", getFarmerReport);

module.exports = router;

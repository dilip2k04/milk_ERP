// src/routes/dashboardRoutes.js

const express = require("express");
const router = express.Router();
const authFirebase = require("../middleware/authFirebase");
const { requireRoles } = require("../middleware/rbac");
const { ROLES } = require("../config/appConfig");
const { getAdminDashboard } = require("../controllers/dashboardController");

router.use(authFirebase, requireRoles([ROLES.ADMIN]));

router.get("/", getAdminDashboard);

module.exports = router;

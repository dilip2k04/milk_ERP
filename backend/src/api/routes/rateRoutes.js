const express = require("express");
const router = express.Router();
const authFirebase = require("../../core/middleware/authFirebase");
const { requireRoles } = require("../../core/middleware/rbac");

const ctrl = require("../controllers/rateController");

// All rate routes require login
router.use(authFirebase);

// Admin only
router.get("/", requireRoles(["admin"]), ctrl.getRate);
router.patch("/", requireRoles(["admin"]), ctrl.updateRate);

module.exports = router;
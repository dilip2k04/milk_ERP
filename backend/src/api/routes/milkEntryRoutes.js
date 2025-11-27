const express = require("express");
const router = express.Router();
const authFirebase = require("../../core/middleware/authFirebase");
const { requireRoles } = require("../../core/middleware/rbac");

const ctrl = require("../controllers/milkEntryController");

// Admin: Get all entries
router.get("/", authFirebase, requireRoles(["admin"]), ctrl.getAllEntries);

// Farmer: Get own entries
router.get("/my", authFirebase, requireRoles(["farmer"]), ctrl.getMyEntries);

// Admin: Get entries by farmer
router.get("/by-farmer/:id", authFirebase, requireRoles(["admin"]), ctrl.getEntriesByFarmer);

module.exports = router;

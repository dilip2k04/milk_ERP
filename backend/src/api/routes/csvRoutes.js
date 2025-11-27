const express = require("express");
const router = express.Router();
const multer = require("multer");
const authFirebase = require("../../core/middleware/authFirebase");
const { requireRoles } = require("../../core/middleware/rbac");

// FIX: Correct controller import
const ctrl = require("../controllers/milkCSVController");

const upload = multer({ dest: "uploads/" });

// CSV UPLOAD ROUTE
router.post(
  "/upload",
  authFirebase,
  requireRoles(["admin"]),
  upload.single("file"),
  ctrl.uploadMilkCSV
);

module.exports = router;

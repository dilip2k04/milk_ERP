const express = require("express");
const router = express.Router();
const multer = require("multer");

const authFirebase = require("../middleware/authFirebase");
const { requireRoles } = require("../middleware/rbac");
const ctrl = require("../controllers/milkCSVController");

const upload = multer({ dest: "uploads/" });

router.post(
  "/upload",
  authFirebase,
  requireRoles(["admin"]),
  upload.single("file"),
  ctrl.uploadMilkCSV
);

module.exports = router;

// src/routes/csvRoutes.js

const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const authFirebase = require("../middleware/authFirebase");
const { requireRoles } = require("../middleware/rbac");
const { ROLES } = require("../config/appConfig");
const { uploadMilkCSV } = require("../controllers/csvController");

const upload = multer({
  dest: path.join(__dirname, "..", "..", "tmp", "csv")
});

router.use(authFirebase, requireRoles([ROLES.ADMIN]));

// POST /api/milk/upload-csv
router.post("/upload-csv", upload.single("file"), uploadMilkCSV);

module.exports = router;

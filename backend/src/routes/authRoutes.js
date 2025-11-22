// src/routes/authRoutes.js

const express = require("express");
const router = express.Router();
const authFirebase = require("../middleware/authFirebase");
const { getMe } = require("../controllers/authController");

router.get("/me", authFirebase, getMe);

module.exports = router;

// src/api/routes/authRoutes.js

const express = require("express");
const router = express.Router();

console.log("🔥 Loaded: authRoutes.js");

const authFirebase = require("../../core/middleware/authFirebase");
const { getMe } = require("../controllers/userController");

// DEBUG: Check controller
console.log("📌 getMe loaded?:", typeof getMe);

// 👇 TEMP TEST ROUTE (always works)
router.get("/test", (req, res) => {
  console.log("🔥 HIT /auth/test");
  res.json({ message: "AUTH ROUTES WORKING" });
});

// 👇 REAL PROTECTED ROUTE
router.get(
  "/me",
  (req, res, next) => {
    console.log("🔥 HIT /auth/me");
    next();
  },
  authFirebase,
  getMe
);

module.exports = router;

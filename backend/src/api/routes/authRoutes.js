const express = require("express");
const router = express.Router();

const authFirebase = require("../../core/middleware/authFirebase");
const { getMe } = require("../controllers/userController");

router.get("/test", (req, res) => {
  res.json({ message: "AUTH ROUTES WORKING" });
});

router.get("/me", authFirebase, getMe);

module.exports = router;

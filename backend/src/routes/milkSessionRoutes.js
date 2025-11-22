const express = require("express");
const router = express.Router();
const authFirebase = require("../middleware/authFirebase");
const { requireRoles } = require("../middleware/rbac");

const {
  createMilkSession,
  getMilkSessions,
  getMilkSessionById,
  updateMilkSession,
  deleteMilkSession
} = require("../controllers/milkSessionController");

const allowedRoles = ["admin"];

router.use(authFirebase, requireRoles(allowedRoles));

router.post("/", createMilkSession);
router.get("/", getMilkSessions);
router.get("/:id", getMilkSessionById);
router.patch("/:id", updateMilkSession);
router.delete("/:id", deleteMilkSession);

module.exports = router;

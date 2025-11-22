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

router.use(authFirebase, requireRoles(["admin"]));

router.post("/", createMilkSession);
router.get("/", getMilkSessions);
router.get("/:id", getMilkSessionById);
router.delete("/:id", deleteMilkSession);
router.put("/:id", updateMilkSession);
router.patch("/:id", updateMilkSession);


module.exports = router;

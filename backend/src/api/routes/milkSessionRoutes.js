const express = require("express");
const router = express.Router();
const authFirebase = require("../../core/middleware/authFirebase");
const { requireRoles } = require("../../core/middleware/rbac");
const validate = require("../../core/middleware/validate");
const {
  createMilkSessionSchema,
  updateMilkSessionSchema
} = require("../validators/milkSessionValidator");

const {
  createMilkSession,
  getMilkSessions,
  getMilkSessionById,
  updateMilkSession,
  deleteMilkSession
} = require("../controllers/milkSessionController");

router.use(authFirebase, requireRoles(["admin"]));

router.post("/", validate(createMilkSessionSchema), createMilkSession);
router.get("/", getMilkSessions);
router.get("/:id", getMilkSessionById);
router.delete("/:id", deleteMilkSession);
router.put("/:id", validate(updateMilkSessionSchema), updateMilkSession);
router.patch("/:id", validate(updateMilkSessionSchema), updateMilkSession);

module.exports = router;

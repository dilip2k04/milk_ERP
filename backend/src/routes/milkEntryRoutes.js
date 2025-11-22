const express = require("express");
const router = express.Router();
const authFirebase = require("../middleware/authFirebase");
const { requireRoles } = require("../middleware/rbac");

const {
  createMilkEntry,
  getMilkEntrys,
  getMilkEntryById,
  updateMilkEntry,
  deleteMilkEntry
} = require("../controllers/milkEntryController");

const allowedRoles = ["admin"];

router.use(authFirebase, requireRoles(allowedRoles));

router.post("/", createMilkEntry);
router.get("/", getMilkEntrys);
router.get("/:id", getMilkEntryById);
router.patch("/:id", updateMilkEntry);
router.delete("/:id", deleteMilkEntry);

module.exports = router;

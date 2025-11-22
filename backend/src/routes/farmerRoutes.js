const express = require("express");
const router = express.Router();
const authFirebase = require("../middleware/authFirebase");
const { requireRoles } = require("../middleware/rbac");

const {
  createFarmer,
  getFarmers,
  getFarmerById,
  updateFarmer,
  deleteFarmer
} = require("../controllers/farmerController");

const allowedRoles = ["admin"];

router.use(authFirebase, requireRoles(allowedRoles));

router.post("/", createFarmer);
router.get("/", getFarmers);
router.get("/:id", getFarmerById);
router.patch("/:id", updateFarmer);
router.delete("/:id", deleteFarmer);

module.exports = router;

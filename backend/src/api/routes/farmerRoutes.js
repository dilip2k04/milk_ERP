const express = require("express");
const router = express.Router();
const authFirebase = require("../../core/middleware/authFirebase");
const { requireRoles } = require("../../core/middleware/rbac");
const validate = require("../../core/middleware/validate");
const {
  createFarmerSchema,
  updateFarmerSchema
} = require("../validators/farmerValidator");

const {
  createFarmer,
  getFarmers,
  getFarmerById,
  updateFarmer,
  deleteFarmer
} = require("../controllers/farmerController");

router.use(authFirebase, requireRoles(["admin"]));

router.post("/", validate(createFarmerSchema), createFarmer);
router.get("/", getFarmers);
router.get("/:id", getFarmerById);
router.patch("/:id", validate(updateFarmerSchema), updateFarmer);
router.delete("/:id", deleteFarmer);

module.exports = router;

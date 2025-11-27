const express = require("express");
const router = express.Router();

const authFirebase = require("../../core/middleware/authFirebase");
const { requireRoles } = require("../../core/middleware/rbac");
const validate = require("../../core/middleware/validate");

const { updateRateSchema } = require("../validators/rateValidator");

const ctrl = require("../controllers/rateController");

router.use(authFirebase);

router.get("/", requireRoles(["admin"]), ctrl.getRate);
router.patch("/", requireRoles(["admin"]), validate(updateRateSchema), ctrl.updateRate);

module.exports = router;

const express = require("express");
const router = express.Router();
const authFirebase = require("../../core/middleware/authFirebase");
const { requireRoles } = require("../../core/middleware/rbac");
const validate = require("../../core/middleware/validate");

const {
  createUserSchema,
  updateUserSchema,
} = require("../validators/userValidator");

const {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

router.use(authFirebase);

router.post("/", requireRoles(["admin"]), validate(createUserSchema), createUser);
router.get("/", requireRoles(["admin"]), getUsers);
router.get("/:id", requireRoles(["admin"]), getUserById);

router.put("/:id", requireRoles(["admin"]), validate(updateUserSchema), updateUser);
router.patch("/:id", requireRoles(["admin"]), validate(updateUserSchema), updateUser);

router.delete("/:id", requireRoles(["admin"]), deleteUser);

module.exports = router;

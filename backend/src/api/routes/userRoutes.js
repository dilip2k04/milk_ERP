const express = require("express");
const router = express.Router();
const authFirebase = require("../../core/middleware/authFirebase");
const { requireRoles } = require("../../core/middleware/rbac");

const {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

router.use(authFirebase);

// CRUD
router.post("/", requireRoles(["admin"]), createUser);
router.get("/", requireRoles(["admin"]), getUsers);
router.get("/:id", requireRoles(["admin"]), getUserById);

router.put("/:id", requireRoles(["admin"]), updateUser);
router.patch("/:id", requireRoles(["admin"]), updateUser);

router.delete("/:id", requireRoles(["admin"]), deleteUser);

module.exports = router;

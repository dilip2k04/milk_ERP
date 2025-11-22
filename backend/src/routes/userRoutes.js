const express = require("express");
const router = express.Router();
const authFirebase = require("../middleware/authFirebase");

const {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

router.use(authFirebase);

// CRUD
router.post("/", createUser);
router.get("/", getUsers);
router.get("/:id", getUserById);

router.put("/:id", updateUser); 
router.patch("/:id", updateUser);  

router.delete("/:id", deleteUser);

module.exports = router;

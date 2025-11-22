const asyncHandler = require("../middleware/asyncHandler");
const admin = require("../config/firebase");
const User = require("../models/User");

// Ensure only admin can do user mgmt
function ensureAdmin(req, res) {
  if (req.role !== "admin") {
    res.status(403).json({ message: "Admin access required" });
    return false;
  }
  return true;
}

// -------------------------------------------------------------
// CREATE USER
// -------------------------------------------------------------
exports.createUser = async (req, res) => {
  try {
    if (!ensureAdmin(req, res)) return;

    const { name, email, phone, role } = req.body;

    if (!name || !email || !phone || !role) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Create Firebase User
    const fbUser = await admin.auth().createUser({
      email,
      password: "123456",
      displayName: name,
    });

    // Save MongoDB User
    const newUser = await User.create({
      firebaseUid: fbUser.uid,
      name,
      email,
      phone,
      role,
      isActive: true,
      createdBy: req.user._id,
    });

    res.status(201).json({ success: true, data: newUser });

  } catch (err) {
    console.error("🔥 Create User Error:", err);
    res.status(500).json({
      message: "Failed to create user",
      error: err.message,
    });
  }
};

// -------------------------------------------------------------
// GET ALL USERS
// -------------------------------------------------------------
exports.getUsers = asyncHandler(async (req, res) => {
  if (!ensureAdmin(req, res)) return;

  const users = await User.find().sort({ createdAt: -1 });
  res.json({ success: true, data: users });
});

// -------------------------------------------------------------
// GET USER BY ID
// -------------------------------------------------------------
exports.getUserById = asyncHandler(async (req, res) => {
  if (!ensureAdmin(req, res)) return;

  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ message: "User not found" });

  res.json({ success: true, data: user });
});

// -------------------------------------------------------------
// UPDATE USER
// -------------------------------------------------------------
exports.updateUser = asyncHandler(async (req, res) => {
  if (!ensureAdmin(req, res)) return;

  const { isActive, name, phone, role } = req.body;

  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ message: "User not found" });

  // Update Firebase status (enable/disable)
  await admin.auth().updateUser(user.firebaseUid, {
    disabled: !isActive,
  });

  // Update MongoDB
  user.name = name;
  user.phone = phone;
  user.role = role;
  user.isActive = isActive;

  await user.save();

  res.json({ success: true, data: user });
});

// -------------------------------------------------------------
// DELETE USER
// -------------------------------------------------------------
exports.deleteUser = asyncHandler(async (req, res) => {
  if (!ensureAdmin(req, res)) return;

  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ message: "User not found" });

  // Delete Firebase account
  await admin.auth().deleteUser(user.firebaseUid);

  // Delete from MongoDB
  await user.deleteOne();

  res.json({ success: true, message: "User deleted successfully" });
});

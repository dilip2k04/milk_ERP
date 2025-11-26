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

    const fbUser = await admin.auth().createUser({
      email,
      password: "123456",
      displayName: name,
    });

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
// GET USERS (Supports Filtering: ?role=farmer)
// -------------------------------------------------------------
exports.getUsers = async (req, res) => {
  try {
    if (!ensureAdmin(req, res)) return;

    const filter = {};

    if (req.query.role) {
      filter.role = req.query.role;
      filter.isActive = true; // Only active farmers
    }

    const users = await User.find(filter).sort({ createdAt: -1 });

    return res.json({ success: true, data: users });

  } catch (err) {
    console.error("User load error:", err);
    return res.status(500).json({ message: "Failed to load users" });
  }
};

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

  await admin.auth().updateUser(user.firebaseUid, {
    disabled: !isActive,
  });

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

  await admin.auth().deleteUser(user.firebaseUid);
  await user.deleteOne();

  res.json({ success: true, message: "User deleted successfully" });
});

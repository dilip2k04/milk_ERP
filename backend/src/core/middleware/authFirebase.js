// src/core/middleware/authFirebase.js
const admin = require("../../config/firebase");
const User = require("../../database/models/User");

async function authFirebase(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      console.log("❌ No token provided");
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    // Verify Firebase token
    const decoded = await admin.auth().verifyIdToken(token);

    console.log("🔥 Firebase UID from token:", decoded.uid);
    console.log("🔥 Firebase UID length:", decoded.uid.length);

    // Try to find user in DB
    const dbUser = await User.findOne({ firebaseUid: decoded.uid });

    console.log("🔥 DB lookup result:", dbUser);

    if (!dbUser) {
      console.log("❌ User NOT FOUND in MongoDB for UID:", decoded.uid);

      // Also print ALL user UIDs for debugging
      const allUsers = await User.find({}, "firebaseUid email name");
      console.log("📌 All users in DB:", allUsers);

      return res.status(401).json({ message: "User not found in database" });
    }

    // Attach user object
    req.user = dbUser;
    req.role = dbUser.role;
    req.firebaseUid = dbUser.firebaseUid;
    req.email = dbUser.email;

    next();
  } catch (err) {
    console.error("🔥 Firebase Auth Error:", err);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}

module.exports = authFirebase;

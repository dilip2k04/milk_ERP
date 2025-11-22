// src/middleware/authFirebase.js
const admin = require("../config/firebase");
const User = require("../models/User");

async function authFirebase(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    // Verify Firebase token
    const decoded = await admin.auth().verifyIdToken(token);

    // Find user in MongoDB
    const dbUser = await User.findOne({ firebaseUid: decoded.uid });

    if (!dbUser) {
      return res.status(401).json({ message: "User not found in database" });
    }

    // Attach user object
    req.user = dbUser;        // full Mongo user
    req.role = dbUser.role;   // required by RBAC middleware
    req.firebaseUid = dbUser.firebaseUid;
    req.email = dbUser.email;

    next();
  } catch (err) {
    console.error("🔥 Firebase Auth Error:", err);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}

module.exports = authFirebase;

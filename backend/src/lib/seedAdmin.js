require("dotenv").config();
const connectDB = require("../config/db");
const User = require("../models/User");
const { ROLES } = require("../config/appConfig");

async function seedAdmin() {
  try {
    await connectDB();

    // If admin already exists, stop
    const existing = await User.findOne({ role: ROLES.ADMIN });
    if (existing) {
      console.log("Admin already exists:", existing);
      process.exit(0);
    }

    const admin = await User.create({
      firebaseUid: "qjKacjJoFHRb8oo6Ql7CtBBSTFz2",
      name: "Super Admin",
      phone: "9999999999",
      email: "admin@gmail.com",
      role: ROLES.ADMIN,
      isActive: true
    });

    console.log("Admin created successfully:");
    console.log(admin);
    process.exit(0);
  } catch (err) {
    console.error("Error creating admin:", err);
    process.exit(1);
  }
}

seedAdmin();

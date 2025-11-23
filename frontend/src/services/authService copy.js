const User = require("../models/User");

const authService = {
  async getAppUser(firebaseUid) {
    return await User.findOne({ firebaseUid, isActive: true });
  },

  async ensureUserExists(firebaseUid, name, phone, role = "shop_keeper") {
    let user = await User.findOne({ firebaseUid });

    if (!user) {
      user = await User.create({
        firebaseUid,
        name,
        phone,
        role,
        createdBy: null
      });
    }
    return user;
  }
};

module.exports = authService;

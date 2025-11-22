const asyncHandler = require("../middleware/asyncHandler");

exports.getMe = asyncHandler(async (req, res) => {
  // req.user is already populated by authFirebase
  res.json({
    success: true,
    data: req.user     // full DB user including role
  });
});

// src/utils/response.js

function success(res, data = {}, status = 200) {
  return res.status(status).json({
    success: true,
    data
  });
}

function failure(res, message = "Something went wrong", status = 500, extra = {}) {
  return res.status(status).json({
    success: false,
    message,
    ...extra
  });
}

module.exports = { success, failure };

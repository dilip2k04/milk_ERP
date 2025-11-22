// src/utils/fileUtils.js

const fs = require("fs");

function safeUnlink(path) {
  try {
    fs.unlinkSync(path);
  } catch (err) {
    // ignore if file already deleted
  }
}

module.exports = { safeUnlink };

const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");

const models = {};

const files = fs
  .readdirSync(__dirname)
  .filter((file) => file !== "index.js" && file.endsWith(".js"));

files.forEach((file) => {
  const model = require(path.join(__dirname, file));
  models[model.modelName] = model;
});

module.exports = models;

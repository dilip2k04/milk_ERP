// app.js
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const apiRoutes = require("./src/api/routes");
const { errorHandler, notFound } = require("./src/core/middleware/errorHandler");
const listEndpoints = require("express-list-endpoints");

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => res.send("Milk ERP API running"));

// ⭐ MOUNT ALL ROUTES
console.log("➡️ Mounting /api routes...");
app.use("/api", apiRoutes);

// ⭐ PRINT ALL REGISTERED ROUTES
setTimeout(() => {
  console.log("📌 REGISTERED ROUTES:");
  console.log(listEndpoints(app));
}, 500);

app.use(notFound);
app.use(errorHandler);

module.exports = app;

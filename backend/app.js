const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const apiRoutes = require("./src/routes");
const { errorHandler, notFound } = require("./src/middleware/errorHandler");

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => res.send("Milk ERP API running"));
app.use("/api", apiRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;

const mongoose = require("mongoose");

const connectDB = async () => {
  const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/milk_erp";

  const conn = await mongoose.connect(uri);

  console.log("------------------------------------------------");
  console.log("🟢 MongoDB Connected");
  console.log("Host:", conn.connection.host);
  console.log("Database name:", conn.connection.name);
  console.log("Using URI:", uri);
  console.log("------------------------------------------------");
};

module.exports = connectDB;

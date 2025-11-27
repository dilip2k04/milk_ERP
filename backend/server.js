require("dotenv").config();
const http = require("http");
const app = require("./app");
const connectDB = require("./src/config/db");

const PORT = process.env.PORT || 5000;

async function start() {
  try {
    await connectDB();
    
    // ONLY start server if not running in test mode
    if (process.env.NODE_ENV !== "test") {
      const server = http.createServer(app);
      server.listen(PORT, () =>
        console.log(`Server running on port ${PORT}`)
      );
    }

    return app;

  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
}

start();

module.exports = start;

const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const airoutes = require("./routes/airoutes");
const problemroutes = require("./routes/problemroutes");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/ai", airoutes);

mongoose.set("bufferCommands", false);

app.use("/api/auth", require("./routes/authroutes"));
app.use("/api/progress", require("./routes/progressroutes"));
app.use("/api/problems", problemroutes);
app.use("/api/problem", problemroutes);

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 5000,
    });
    console.log("MongoDB Connected");

    // Optional: seed sample problems on startup.
    try {
      const seedProblems = require("./seed/seedProblems");
      await seedProblems();
    } catch (e) {
      console.log("Problem seeding skipped/failed:", e.message);
    }

    const port = process.env.PORT || 5000;
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error("MongoDB Connection Error:", error.message);
    process.exit(1);
  }
};

startServer();
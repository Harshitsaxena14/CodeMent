require("dotenv").config();

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

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");

    // Optional: seed sample problems on startup.
    // This supports thousands later by replacing/updating seed data externally.
    try {
      const seedProblems = require("./seed/seedProblems");
      await seedProblems();
    } catch (e) {
      console.log("Problem seeding skipped/failed:", e.message);
    }

    app.listen(process.env.PORT || 5000, () => {
      console.log("Server running on port 5000");
    });
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

startServer();

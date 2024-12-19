// backend/config.js
const mongoose = require("mongoose");
require("dotenv").config();

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      // Retirez simplement ces deux lignes :
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
      family: 4, // Gardez cette option si vous en avez besoin pour forcer IPv4
    });
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
    process.exit(1);
  }
}

module.exports = connectDB;

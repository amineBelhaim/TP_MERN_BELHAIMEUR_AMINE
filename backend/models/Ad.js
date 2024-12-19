// backend/models/Ad.js
const mongoose = require("mongoose");

const AdSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String },
  price: { type: Number, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Ad", AdSchema);

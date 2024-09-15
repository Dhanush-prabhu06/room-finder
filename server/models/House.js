// models/House.js
const mongoose = require("mongoose");

const houseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  roomType: { type: String, required: true },
  description: { type: String },
  coordinates: {
    type: { type: String, enum: ["Point"], required: true },
    coordinates: { type: [Number], required: true },
  },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Reference to User model
});

houseSchema.index({ coordinates: "2dsphere" }); // Spatial index for geo queries

module.exports = mongoose.model("House", houseSchema);

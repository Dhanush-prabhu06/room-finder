// models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["owner", "student"], required: true }, // Distinguishes owner or student
  location: {
    type: {
      type: String,
      enum: ["Point"],
      required: function () {
        return this.role === "student";
      },
    }, // Required for students
    coordinates: {
      type: [Number],
      required: function () {
        return this.role === "student";
      },
    }, // Required for students
  },
});

userSchema.index({ location: "2dsphere" }); // Index for spatial queries

module.exports = mongoose.model("User", userSchema);

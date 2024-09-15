// controllers/studentController.js
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const House = require("../models/House");

exports.register = async (req, res) => {
  const { name, email, phone, password, location } = req.body;

  try {
    const studentExists = await User.findOne({ email, role: "student" });
    if (studentExists) {
      return res.status(400).json({ message: "Student already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newStudent = new User({
      name,
      email,
      phone,
      password: hashedPassword,
      role: "student",
      location: {
        type: "Point",
        coordinates: location.coordinates,
      },
    });

    await newStudent.save();
    res.status(201).json({ message: "Student registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getNearbyHouses = async (req, res) => {
  const { coordinates } = req.query;

  try {
    const houses = await House.find({
      coordinates: {
        $near: {
          $geometry: { type: "Point", coordinates: JSON.parse(coordinates) },
          $maxDistance: 5000, // Find houses within 5 km radius
        },
      },
    });

    res.json(houses);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch nearby houses" });
  }
};

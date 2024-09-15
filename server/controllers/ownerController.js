// controllers/ownerController.js
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const House = require("../models/House");

exports.register = async (req, res) => {
  const { name, email, phone, password } = req.body;

  try {
    const ownerExists = await User.findOne({ email, role: "owner" });
    if (ownerExists) {
      return res.status(400).json({ message: "Owner already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newOwner = new User({
      name,
      email,
      phone,
      password: hashedPassword,
      role: "owner",
    });

    await newOwner.save();
    res.status(201).json({ message: "Owner registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Adding House

exports.addHouse = async (req, res) => {
  const { name, roomType, description, coordinates } = req.body;

  try {
    const newHouse = new House({
      name,
      roomType,
      description,
      coordinates,
      owner: req.user.id,
    });

    await newHouse.save();
    res.status(201).json({ message: "House added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to add house" });
  }
};

// Getting house

exports.getHouses = async (req, res) => {
  try {
    const houses = await House.find({ owner: req.user.id });
    res.json(houses);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch houses" });
  }
};

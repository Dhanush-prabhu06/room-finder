// routes/studentRouter.js
const express = require("express");
const {
  register,
  getNearbyHouses,
} = require("../controllers/studentController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Student routes
router.post("/register", register);
router.get("/houses", authMiddleware, getNearbyHouses);

module.exports = router;

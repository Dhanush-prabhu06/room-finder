// routes/ownerRouter.js
const express = require("express");
const {
  register,
  addHouse,
  getHouses,
} = require("../controllers/ownerController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Owner routes
router.post("/register", register);
router.post("/houses", authMiddleware, addHouse);
router.get("/houses", authMiddleware, getHouses);

module.exports = router;

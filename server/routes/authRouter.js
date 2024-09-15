// routes/authRouter.js
const express = require("express");
const { login } = require("../controllers/authController");

const router = express.Router();

// Login route for both owner and student
router.post("/login", login);

module.exports = router;

const express = require("express");
const {signup, login} =require("../controllers/userController.js");

const router = express.Router();

// Signup Route
router.post("/signup", signup);
router.post("/login", login);

module.exports = router;
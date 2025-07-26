const User = require("../model/User");
const { createSecretToken } = require("../util/SecretToken");
const bcrypt = require("bcryptjs");

// Signup Function
module.exports.signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists with this email." });
    }
    const newUser = await User.create({
      email,
      password,
      username,
    });
    const token = createSecretToken(newUser._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false, // Set to true in production
    });
    res
      .status(201)
      .json({
        message: "User signed up successfully.",
        success: true,
        newUser,
      });
  } catch (error) {
    console.error("Signup Error:", error);
    res
      .status(500)
      .json({ message: "Server error during signup.", details: error.message });
  }
};

// FIX: Renamed from "Login" to "login"
module.exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials." });
    }
    const auth = await bcrypt.compare(password, user.password);
    if (!auth) {
      return res.status(401).json({ message: "Invalid credentials." });
    }
    const token = createSecretToken(user._id);
    res.cookie("token", token, {
        withCredentials: true,
        httpOnly: false, // Set to true in production
    });
    res
      .status(200)
      .json({ message: "User logged in successfully", success: true, user });
  } catch (error)
    {
    console.error("Login Error:", error);
    res
      .status(500)
      .json({ message: "Server error during login.", details: error.message });
  }
};
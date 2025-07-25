const User = require("../model/User");
const { createSecretToken } = require("../util/SecretToken");
const bcrypt = require("bcryptjs");

module.exports.Signup = async (req, res, next) => {
  try {
    const { username, email, password, walletBalance, createdAt } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ message: "User already exists with this email." });
    }
    const newUser = await User.create({
      email,
      password,
      username,
      walletBalance,
      createdAt,
    });
    const token = createSecretToken(newUser._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: true,
    });
    res
      .status(201)
      .json({
        message: "User signed up successfully.",
        success: true,
        newUser,
      });
    next();
  } catch (error) {
    res
      .status(500)
      .json({ error: "Server error during signup.", details: error.message });
  }
};

module.exports.Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({ message: "Email and password are required." });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ message: "User not found." });
    }
    const auth = await bcrypt.compare(password, user.password);
    if (!auth) {
      return res.json({ message: "Invalid credentials." });
    }
    const token = createSecretToken(user._id);
    res.cookie("token", token, {
      // httpOnly: false, // You had this, which is okay for development, but consider setting to true in production for security
      maxAge: 3 * 24 * 60 * 60 * 1000, // This sets the cookie to expire in 3 days
      secure: process.env.NODE_ENV === "production", // Set to true in production for HTTPS
      sameSite: "lax", // Recommended for security
    });
    res
      .status(201)
      .json({ message: "User logged in successfully", success: true, user });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Server error during login.", details: error.message });
  }
};

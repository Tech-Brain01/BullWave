const User = require("../model/User");
require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports.userVerification = async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ status: false });
  }
  jwt.verify(token, process.env.JWT_SECRET, async (err, data) => {
    if (err) {
      return res.json({ status: false });
    } else {
      const user = await User.findById(data.id);
      if (user) {
        // FIX: Send back the essential user data, not just the username
        return res.json({ 
          status: true, 
          user: {
            id: user._id,
            username: user.username,
            email: user.email
          } 
        });
      } else {
        return res.json({ status: false });
      }
    }
  });
};

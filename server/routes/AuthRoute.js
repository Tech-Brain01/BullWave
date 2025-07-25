const { Signup, Login } = require("../Controllers/AuthController");
const { getDashboardData } = require("../Controllers/DashboardController"); // Import the new controller
const router = require("express").Router();
const { userVerification } = require("../Middlewares/AuthMiddleware");

router.post('/', userVerification);
router.post("/signup", Signup);
router.post("/login", Login);

// Add the new route for dashboard data
router.get("/dashboard/:userId", getDashboardData);

module.exports = router;
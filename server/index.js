const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
require("dotenv").config();
const cookieParser = require("cookie-parser");
const authRoute = require("./routes/AuthRoute");


const PORT = process.env.PORT || 3001;
const URL = process.env.MONGO_URL;


// --- Database Connection ---
mongoose
  .connect(URL, {})
  .then(() => console.log("MongoDB connected successfully."))
  .catch((err) => console.error("MongoDB connection error:", err));


// --- Middleware ---
// Import all your models
const Users = require("./model/User");
const Portfolios = require("./model/Portfolio");
const Transactions = require("./model/Transaction");
const StockMetadatas = require("./model/Metadata");


app.use(
  cors({
    origin: ["http://localhost:5173"], // Replace with  frontend's actual origin
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(cookieParser());

app.use(express.json());

app.use("/", authRoute);


// --- API Routes ---

// 1. Seeding Route

//  app.use('/api/seed', require('./routes/seed'));

// 2. Data-Fetching Routes for Application


app.get('/api/users', async (req, res) => {
  try {
    const users = await Users.find({}).select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Server error fetching users.", details: error.message });
  }
});

app.get("/api/portfolio/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const portfolio = await Portfolios.findOne({ userId: userId });
    if (!portfolio) {
      return res
        .status(404)
        .json({ message: "Portfolio not found for this user." });
    }
    res.json(portfolio);
  } catch (error) {
    res
      .status(500)
      .json({
        error: "Server error fetching portfolio.",
        details: error.message,
      });
  }
});

app.get("/api/transactions/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const transactions = await Transactions.find({ userId: userId }).sort({ date: -1 });
    res.json(transactions);
  } catch (error) {
        res.status(500).json({ error: "Server error fetching transactions.", details: error.message });
    }
});

app.get('/api/metadata', async (req, res) => {
  try {
    const metadata = await StockMetadatas.find({});
    res.json(metadata);
  }
  catch (error) {
    res.status(500).json({ error: "Server error fetching metadata.", details: error.message });
  }
});



app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

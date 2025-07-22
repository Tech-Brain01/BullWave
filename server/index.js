require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Import all your models
const { User } = require('./model/User');
const { Portfolio } = require('./model/Portfolio');
const { Transaction } = require('./model/Transaction');
const { StockMetadata } = require('./model/Metadata');


const app = express();
const PORT = process.env.PORT || 3001; 
const URL = process.env.MONGO_URL;

// --- Middleware ---
app.use(cors());
app.use(express.json());

// --- Database Connection ---
mongoose
  .connect(URL, {})
  .then(() => console.log("MongoDB connected successfully."))
  .catch((err) => console.error("MongoDB connection error:", err));

// --- API Routes ---

// 1. Seeding Route 

// app.use('/api/seed', require('./routes/seed'));


// 2. Data-Fetching Routes for Application


app.get('/api/portfolio/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const portfolio = await Portfolio.findOne({ userId: userId });
        if (!portfolio) {
            return res.status(404).json({ message: "Portfolio not found for this user." });
        }
        res.json(portfolio);
    } catch (error) {
        res.status(500).json({ error: "Server error fetching portfolio.", details: error.message });
    }
});


app.get('/api/transactions/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const transactions = await Transaction.find({ userId: userId }).sort({ date: -1 }); 
        res.json(transactions);
    } catch (error) {
        res.status(500).json({ error: "Server error fetching transactions.", details: error.message });
    }
});

app.get('/api/metadata', async (req, res) => {
  try {
    const metadata = await StockMetadata.find({});
    res.json(metadata);
  }
  catch (error) {
    res.status(500).json({ error: "Server error fetching metadata.", details: error.message });
  }
});

app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find({}).select('-password'); 
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Server error fetching users.", details: error.message });
  }
});



app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
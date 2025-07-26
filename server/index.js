const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require('http'); 
const app = express();
const { Server } = require("socket.io");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const authRoute = require('./routes/AuthRoute');
const { connectToUpstoxWebSocket } = require('./upstox-ws');

const { getMarketData, getStockBySymbol, getInstruments } = require('./Controllers/MarketController');


const server = http.createServer(app);

// Correctly configure CORS for Socket.IO
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Your frontend's origin
    methods: ["GET", "POST"],
    credentials: true
  }
});

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
    origin: ["http://localhost:5173"], // Your frontend's origin
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(cookieParser());

app.use(express.json());

app.use("/", authRoute);

// FIX: Use the correctly imported handler functions directly
app.get('/api/market-data', getMarketData);
app.get('/api/market-data/:symbol', getStockBySymbol);

// --- API Routes ---

// 1. Seeding Route

 app.use('/api/seed', require('./routes/seed'));

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



// --- WebSocket Connection Logic ---
io.on('connection', (socket) => {
    console.log(`✅ User connected via WebSocket: ${socket.id}`);
    socket.on('disconnect', () => {
        console.log(`❌ User disconnected: ${socket.id}`);
    });
});

// --- Upstox API Connection ---
const accessToken = "eyJ0eXAiOiJKV1QiLCJrZXlfaWQiOiJza192MS4wIiwiYWxnIjoiSFMyNTYifQ.eyJzdWIiOiI0NkNLTkwiLCJqdGkiOiI2ODg0YmNmM2JiZWI1ODQ1YWMzYzc2NzkiLCJpc011bHRpQ2xpZW50IjpmYWxzZSwiaXNQbHVzUGxhbiI6dHJ1ZSwiaWF0IjoxNzUzNTI5NTg3LCJpc3MiOiJ1ZGFwaS1nYXRld2F5LXNlcnZpY2UiLCJleHAiOjE3NTM1NjcyMDB9.PS4GBQCb5q7Guksnp40OerGDjy-qS8U1FxmYXpl86y8"; // ✅ This is your real token.

// 👇 FIX: Compare against a generic placeholder string, NOT your real token.
if (accessToken && accessToken !== "your_valid_upstox_access_token") {
    console.log("Attempting to connect to Upstox WebSocket...");
    connectToUpstoxWebSocket(accessToken, io);
} else {
    console.warn("❗ Upstox access token is missing. Starting market simulator for development.");
    // We can call the simulator directly if no token is provided
    const { runMarketSimulator } = require('./upstox-ws');
    const instrumentsToSubscribe = ["NSE_INDEX|Nifty 50", "NSE_INDEX|Nifty Bank", "NSE_EQ|INE002A01018"];
    runMarketSimulator(io, instrumentsToSubscribe);
}
// 4. Start the HTTP Server (not the Express app)
server.listen(PORT, () => {
    console.log(`🚀 Server is listening on http://localhost:${PORT}`);
    // Pre-fetch the instrument list on server start. This will create the cache.
    getInstruments().catch(err => {
        console.error("🔴 [STARTUP-ERROR] Failed to pre-fetch instruments:", err.message);
    });
});
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require('http');
const { Server } = require("socket.io");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const authRoute = require('./routes/AuthRoute');

// Correctly import the initWebSocket function
const { initWebSocket } = require('./upstox-ws'); 
const { getMarketData, getStockBySymbol, getInstruments } = require('./Controllers/MarketController');

const app = express();
const server = http.createServer(app);

const allowedOrigins = [
  'http://localhost:5173',      // Your local client
  process.env.CLIENT_URL,       // Your deployed client URL from .env
];

// Correctly configure CORS for Socket.IO and Express
const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests if the origin is in our allowed list, or if there's no origin (like with Postman)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"], // It's good practice to include all methods you use
  credentials: true,
};

const io = new Server(server, {
  cors: corsOptions
});

const PORT = process.env.PORT || 3001;
const URL = process.env.MONGO_URL;

// --- Database Connection ---
mongoose
  .connect(URL, {})
  .then(() => console.log("✅ MongoDB connected successfully."))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// --- Middleware ---
app.use(cors(corsOptions)); // Use CORS for Express routes
app.use(express.json());
app.use(cookieParser());

// --- Routes ---
app.use("/", authRoute);
app.get('/api/market-data', getMarketData);
app.get('/api/stock/:symbol', getStockBySymbol);
app.get('/api/instruments', getInstruments);

// --- Socket.IO Connection Handling ---
io.on('connection', (socket) => {
    console.log(`⚡ User connected: ${socket.id}`);
    socket.on('disconnect', () => {
        console.log(`❌ User disconnected: ${socket.id}`);
    });
});

// --- Server Startup ---
server.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
    
    // ✅ CORRECT: Call the initWebSocket function after the server starts.
    // We pass the 'io' object so the websocket can broadcast data to clients.
    console.log("📡 Initializing Upstox WebSocket connection...");
    initWebSocket(io);
});
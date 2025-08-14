const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require('http');
const { Server } = require("socket.io");
const fs = require('fs');
const path = require('path');
require("dotenv").config();
const cookieParser = require("cookie-parser");

const authRoute = require('./routes/AuthRoute');
const { connectToUpstoxWebSocket } = require('./upstox-ws');
const { getMarketData, getStockBySymbol, setAccessToken } = require('./Controllers/MarketController');

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "http://localhost:5173" } });

const PORT = process.env.PORT || 3001;
const URL = process.env.MONGO_URL;
const tokenFilePath = path.join(__dirname, 'upstox_access_token.txt');

mongoose
    .connect(URL, {})
    .then(() => console.log("✅ MongoDB connected successfully."))
    .catch((err) => console.error("🔴 MongoDB connection error:", err));

app.use(cors({ origin: ["http://localhost:5173"], credentials: true }));
app.use(cookieParser());
app.use(express.json());

app.use("/", authRoute);
app.get('/api/market-data', getMarketData);
app.get('/api/market-data/:symbol', getStockBySymbol);

// This endpoint receives the token after successful login
app.post('/upstox-token', (req, res) => {
    const { access_token } = req.body;
    if (access_token) {
        fs.writeFileSync(tokenFilePath, access_token);
        console.log("🔑 Access token saved to file.");
        setAccessToken(access_token);
        connectToUpstoxWebSocket(access_token, io);
        res.status(200).json({ success: true, message: "Access token processed." });
    } else {
        res.status(400).json({ success: false, message: "Access token not provided." });
    }
});

io.on('connection', (socket) => {
    console.log(`✅ WebSocket client connected: ${socket.id}`);
    socket.on('disconnect', () => console.log(`❌ WebSocket client disconnected: ${socket.id}`));
});

// --- CORRECTED SERVER STARTUP LOGIC ---
server.listen(PORT, () => {
    console.log(`🚀 Server is listening on http://localhost:${PORT}`);

    // On startup, check if a token file exists and use it.
    if (fs.existsSync(tokenFilePath)) {
        console.log("🔑 Found existing access token file.");
        const existingToken = fs.readFileSync(tokenFilePath, 'utf-8');
        if (existingToken) {
            console.log("✅ Token loaded into memory. Connecting to Upstox WebSocket...");
            setAccessToken(existingToken);
            connectToUpstoxWebSocket(existingToken, io);
        }
    } else {
        // If no token exists, prompt the user to authenticate.
        console.warn("⚠️ No Upstox access token found. Please authenticate by visiting:");
        console.warn(`   => http://localhost:${PORT}/auth/upstox`);
    }
});
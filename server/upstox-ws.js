// server/upstox-ws.js

const WebSocket = require('ws');
const axios = require('axios');
const protobuf = require('protobufjs');

// --- Protobuf Definition ---
// We need to expand this to handle the "full" feed data.
const protoDefinition = `
syntax = "proto3";
import "google/protobuf/timestamp.proto";

message LTPC {
    double ltp = 1;
    int64 ltt = 2;
    int64 ltq = 3;
    double cp = 4;
}

message MarketLevel {
    int64 quantity = 1;
    double price = 2;
    int32 orders = 3;
}

message MarketOHLC {
    string interval = 1;
    double open = 2;
    double high = 3;
    double low = 4;
    double close = 5;
    int64 volume = 6;
    google.protobuf.Timestamp ts = 7;
}

// The main Feed object now includes the full market depth and OHLC
message Feed {
    oneof Details {
        LTPC ltpc = 1;
        MarketLevel marketLevel = 2;
        MarketOHLC ohlc = 3;
    }
}

message FeedResponse {
    string type = 1;
    map<string, Feed> feeds = 2;
}
`;
const root = protobuf.parse(protoDefinition).root;
const FeedResponse = root.lookupType("FeedResponse");
const MarketOHLC = root.lookupType("MarketOHLC");

let marketSimulatorInterval = null;

// --- MARKET SIMULATOR ---
// This function will run when the real market is closed.
const runMarketSimulator = (io, instruments) => {
    console.log('📈 Market is closed. Starting Market Simulator for development.');

    if (marketSimulatorInterval) {
        clearInterval(marketSimulatorInterval);
    }

    marketSimulatorInterval = setInterval(() => {
        // Pick a random stock from our list to update
        const instrumentKey = instruments[Math.floor(Math.random() * instruments.length)];

        // Simulate a price change
        const priceChange = (Math.random() - 0.5) * 0.1; // Small random change
        const newVolume = Math.floor(Math.random() * 1000) + 50;

        // Create a fake data packet that mimics the real one
        const simulatedTick = {
            instrumentKey: instrumentKey,
            ltp: (100 + Math.random() * 2000).toFixed(2), // Just a random base price for simulation
            volume: newVolume,
        };

        // Add a simulated change based on a fake closing price
        const simulatedClosePrice = simulatedTick.ltp - priceChange * 50;
        simulatedTick.change = (simulatedTick.ltp - simulatedClosePrice);
        simulatedTick.changePercent = (simulatedTick.change / simulatedClosePrice) * 100;


        // Emit to the frontend
        io.emit('stockData', simulatedTick);

    }, 800); // Send an update every 800ms
};


const connectToUpstoxWebSocket = async (accessToken, io) => {
    // List of instruments we want to track
    const instrumentsToSubscribe = ["NSE_INDEX|Nifty 50", "NSE_INDEX|Nifty Bank", "NSE_EQ|INE002A01018"]; // Nifty 50, Nifty Bank, Reliance

    try {
        const authResponse = await axios.get('https://api-v2.upstox.com/feed/market-data-feed/authorize', {
            headers: { 'Authorization': `Bearer ${accessToken}`, 'Api-Version': '2.0' }
        });

        const wsUrl = authResponse.data.data.authorized_redirect_uri;
        const ws = new WebSocket(wsUrl, { headers: { "Api-Version": "2.0" } });

        let lastMessageTime = Date.now();

        ws.on('open', () => {
            console.log('✅ Connection to Upstox WebSocket established.');
            // *** CRITICAL CHANGE: Request "full" mode for more data ***
            const subscriptionData = {
                guid: "some-unique-guid-full",
                method: "sub",
                data: {
                    mode: "full",
                    instrumentKeys: instrumentsToSubscribe
                }
            };
            ws.send(JSON.stringify(subscriptionData));
            console.log("Sent 'full' mode subscription request for instruments.");
            lastMessageTime = Date.now(); // Reset timer on connect

            // Start the simulator if no real data arrives after 5 seconds
            setTimeout(() => {
                if (Date.now() - lastMessageTime > 4900) {
                     runMarketSimulator(io, instrumentsToSubscribe);
                }
            }, 5000);
        });

        ws.on('message', (data) => {
            // If we get a real message, stop the simulator
            if (marketSimulatorInterval) {
                clearInterval(marketSimulatorInterval);
                marketSimulatorInterval = null;
                console.log('📉 Real market data received. Stopping Market Simulator.');
            }
            lastMessageTime = Date.now();

            try {
                const decodedData = FeedResponse.decode(data);
                const feedObject = FeedResponse.toObject(decodedData, { defaults: true });

                for (const instrumentKey in feedObject.feeds) {
                    const feed = feedObject.feeds[instrumentKey];
                    const stockData = { instrumentKey };

                    // Extract detailed data from the "full" feed
                    if (feed.ltpc) {
                        stockData.ltp = feed.ltpc.ltp;
                        stockData.change = (feed.ltpc.ltp - feed.ltpc.cp);
                        stockData.changePercent = ((stockData.change / feed.ltpc.cp) * 100);
                    }
                    if(feed.ohlc) {
                        stockData.volume = feed.ohlc.volume;
                        stockData.open = feed.ohlc.open;
                        stockData.high = feed.ohlc.high;
                        stockData.low = feed.ohlc.low;
                        stockData.close = feed.ohlc.close;
                    }

                    // Only emit if we have a price update
                    if (stockData.ltp) {
                         io.emit('stockData', stockData);
                    }
                }
            } catch (error) {
                console.error('🔴 Error processing message from Upstox:', error);
            }
        });

        ws.on('error', (error) => console.error('🔴 Upstox WebSocket Error:', error.message));
        ws.on('close', () => {
             console.log('Upstox WebSocket closed. Starting simulator.');
             runMarketSimulator(io, instrumentsToSubscribe); // Start simulator if connection drops
        });

    } catch (error) {
        console.error('🔴 Failed to authorize WebSocket. Will start simulator instead.');
        runMarketSimulator(io, instrumentsToSubscribe); // Start simulator if auth fails
    }
};

module.exports = { connectToUpstoxWebSocket };
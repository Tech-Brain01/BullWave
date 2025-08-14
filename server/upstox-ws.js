const WebSocket = require('ws');
const axios = require('axios');
const protobuf = require('protobufjs');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

// Ensure log directory exists
const logDir = path.join(__dirname, 'logs');
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}
const rawDataLogPath = path.join(logDir, 'raw_upstox_data.log');

// --- Protobuf Definition ---
const protoDefinition = `
syntax = "proto3";
import "google/protobuf/timestamp.proto";
message LTPC { double ltp = 1; int64 ltt = 2; int64 ltq = 3; double cp = 4; }
message MarketLevel { int64 quantity = 1; double price = 2; int32 orders = 3; }
message MarketOHLC { string interval = 1; double open = 2; double high = 3; double low = 4; double close = 5; int64 volume = 6; google.protobuf.Timestamp ts = 7; }
message Feed { oneof Details { LTPC ltpc = 1; MarketLevel marketLevel = 2; MarketOHLC ohlc = 3; } }
message FeedResponse { string type = 1; map<string, Feed> feeds = 2; }
`;
const root = protobuf.parse(protoDefinition).root;
const FeedResponse = root.lookupType("FeedResponse");


const connectToUpstoxWebSocket = async (accessToken, io) => {
    try {
        const authResponse = await axios.get('https://api-v2.upstox.com/feed/market-data-feed/authorize', {
            headers: { 'Authorization': `Bearer ${accessToken}`, 'Api-Version': '2.0', 'Accept': 'application/json' }
        });

        const wsUrl = authResponse.data.data.authorized_redirect_uri;
        const ws = new WebSocket(wsUrl, { headers: { "Api-Version": "2.0" } });

        ws.on('open', async () => {
            console.log('✅ [WebSocket] Connection established.');
            
            const subscriptionData = {
                guid: uuidv4(),
                method: "sub",
                data: {
                    mode: "full",
                    // Subscribing to Reliance Industries
                    instrumentKeys: ["NSE_EQ|INE002A01018"] 
                }
            };
            ws.send(JSON.stringify(subscriptionData));
            // --- CORRECTED LOG MESSAGE ---
            console.log(`✅ [WebSocket] Sent subscription request for Reliance Industries.`);
        });

        ws.on('message', (data) => {
            console.log("📨 [WebSocket] Message received!"); 
            try {
                const decodedData = FeedResponse.decode(data);
                const feedObject = FeedResponse.toObject(decodedData, { defaults: true });

                const logData = `[${new Date().toISOString()}] RECEIVED: ${JSON.stringify(feedObject, null, 2)}\n\n`;
                fs.appendFileSync(rawDataLogPath, logData);
                console.log("✅ [Logger] Successfully wrote data to log file."); 

                for (const instrumentKey in feedObject.feeds) {
                    const feed = feedObject.feeds[instrumentKey];
                    io.emit('stockData', { instrumentKey, ...feed });
                }
            } catch (error) {
                console.error('🔴 [WebSocket] Error processing message:', error);
            }
        });

        ws.on('error', (error) => console.error('🔴 [WebSocket] Error:', error.message));
        ws.on('close', () => console.log('❌ [WebSocket] Connection closed.'));
        ws.on('ping', () => console.log('💓 [WebSocket] Ping received.'));

    } catch (error) {
        console.error('🔴 [WebSocket] Failed to authorize:', error.response ? error.response.data : error.message);
    }
};

module.exports = { connectToUpstoxWebSocket };

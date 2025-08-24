const WebSocket = require('ws');
const axios = require('axios');
const protobuf = require('protobufjs');
const path = require('path');
const fs = require('fs');

const protoFilePath = path.resolve(__dirname, 'proto/MarketDataFeed.proto');

const getMarketDataFeedUrl = async (apiToken) => {
    const headers = {
        'Accept': 'application/json',
        'Authorization': `Bearer ${apiToken}`
    };
    try {
        const response = await axios.get('https://api.upstox.com/v2/feed/market-data-feed/authorize', { headers });
        return response.data.data.authorizedRedirectUri;
    } catch (error) {
        console.error("❌ Error getting market data feed URL:", error.response ? error.response.data : error.message);
        throw error;
    }
};

const decodeProfobuf = (buffer, root) => {
    try {
        const FeedResponse = root.lookupType("com.upstox.marketdatafeeder.rpc.proto.FeedResponse");
        const decodedMessage = FeedResponse.decode(buffer);
        return FeedResponse.toObject(decodedMessage);
    } catch (error) {
        console.error('❌ Error decoding protobuf message:', error);
        return null;
    }
};

// MODIFIED: Function now accepts the 'io' object from Socket.IO
const initWebSocket = async (io) => { 
    const tokenFilePath = path.join(__dirname, 'upstox_access_token.txt');
    if (!fs.existsSync(tokenFilePath)) {
        console.error("❗ Access token file not found. Please create upstox_access_token.txt in the server directory.");
        return;
    }
    const accessToken = fs.readFileSync(tokenFilePath, 'utf8').trim();

    try {
        const wsUrl = await getMarketDataFeedUrl(accessToken);
        const ws = new WebSocket(wsUrl, {
            headers: {
                "Authorization": `Bearer ${accessToken}`,
                "Api-Version": "2.0"
            },
            followRedirects: true
        });

        const root = await protobuf.load(protoFilePath);

        ws.on('open', () => {
            console.log('✅ Connected to Upstox WebSocket');
            const data = {
                "guid": "someguid",
                "method": "sub",
                "data": {
                    "mode": "full",
                    "instrumentKeys": ["NSE_INDEX|Nifty 50", "NSE_INDEX|Nifty Bank", "NSE_EQ|INE009A01021"] // Added Reliance for testing
                }
            };
            ws.send(Buffer.from(JSON.stringify(data)));
        });

        ws.on('message', (data) => {
            const decodedData = decodeProfobuf(data, root);
            if (decodedData) {
                console.log("Received data:", JSON.stringify(decodedData, null, 2));
                
                // ✅ ADDED: Broadcast the data to all connected frontend clients
                io.emit('market-data', decodedData);
            }
        });

        ws.on('close', () => {
            console.log('🔌 Disconnected from Upstox WebSocket');
        });

        ws.on('error', (error) => {
            console.error('❌ WebSocket error:', error);
        });

    } catch (error) {
        console.error("❌ Failed to initialize WebSocket:", error);
    }
};

module.exports = { initWebSocket };
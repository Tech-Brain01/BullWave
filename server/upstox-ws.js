// server/upstox-ws.js

const WebSocket = require('ws');
const axios = require('axios');
const protobuf = require('protobufjs');

// --- Protobuf Definition ---
const protoDefinition = `
syntax = "proto3";
message LTPC {
    double ltp = 1;
    int64 ltt = 2;
    int64 ltq = 3;
    double cp = 4;
}
message Feed {
    oneof Details {
        LTPC ltpc = 1;
    }
}
message FeedResponse {
    string type = 1;
    map<string, Feed> feeds = 2;
}
`;
const root = protobuf.parse(protoDefinition).root;
const FeedResponse = root.lookupType("FeedResponse");
// --- End of Protobuf Definition ---

const connectToUpstoxWebSocket = async (accessToken, io) => {
    if (!accessToken) {
        console.error("🔴 Upstox WebSocket: Access Token is missing.");
        return;
    }

    try {
        // STEP 1: Get the authorized WebSocket URL
        console.log("Getting authorized WebSocket URL...");
        const authResponse = await axios.get('https://api-v2.upstox.com/feed/market-data-feed/authorize', {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Api-Version': '2.0'
            }
        });

        const wsUrl = authResponse.data.data.authorized_redirect_uri;
        console.log("✅ Successfully got WebSocket URL. Connecting...");

        // STEP 2: Connect to the new, authorized URL
        const ws = new WebSocket(wsUrl);

        ws.on('open', () => {
            console.log('✅ Connection to Upstox WebSocket established.');
            const subscriptionData = {
                guid: "some-unique-guid",
                method: "sub",
                data: {
                    mode: "full",
                    instrumentKeys: ["NSE_INDEX|Nifty 50", "NSE_INDEX|Nifty Bank", "NSE_EQ|INE002A01018"] // Nifty 50, Nifty Bank, Reliance
                }
            };
            ws.send(JSON.stringify(subscriptionData));
            console.log("Sent subscription request for instruments.");
        });

        // --- FIX: Single, Correct Message Handler ---
        ws.on('message', (data) => {
            // This is for debugging; you can see the raw messages arriving.
            console.log(`Received a raw message from Upstox of size: ${data.length} bytes.`);

            try {
                const decodedData = FeedResponse.decode(data);
                const feedObject = FeedResponse.toObject(decodedData, { defaults: true });

                for (const instrumentKey in feedObject.feeds) {
                    const feed = feedObject.feeds[instrumentKey];
                    if (feed.ltpc) {
                        const stockData = {
                            instrumentKey: instrumentKey,
                            symbol: instrumentKey.split('|')[1],
                            price: feed.ltpc.ltp,
                            change: (feed.ltpc.ltp - feed.ltpc.cp),
                            changePercent: (((feed.ltpc.ltp - feed.ltpc.cp) / feed.ltpc.cp) * 100),
                        };
                        // Broadcast the clean data to the frontend
                        io.emit('stockData', stockData);
                    }
                }
            } catch (error) {
                console.error('🔴 Error processing message from Upstox:', error);
            }
        });

        ws.on('error', (error) => {
            console.error('🔴 Upstox WebSocket Error:', error.message);
        });

        ws.on('close', (code) => {
            console.log(`Upstox WebSocket closed. Code: ${code}`);
        });

    } catch (error) {
        console.error('🔴 Failed to authorize or connect to Upstox WebSocket.');
        if (error.response) {
            console.error('Error Details:', error.response.data);
        }
    }
};

module.exports = { connectToUpstoxWebSocket };
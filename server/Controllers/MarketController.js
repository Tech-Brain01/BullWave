// server/controllers/MarketController.js
const fs = require('fs');
const path = require('path');
const axios = require('axios');

const instrumentsFilePath = path.join(__dirname, '..', 'temp', 'nse_equity_instruments.json');
const tokenFilePath = path.join(__dirname, '..', 'upstox_access_token.txt');

let upstoxAccessToken = null;

const setAccessToken = (token) => {
    upstoxAccessToken = token;
};

const handleApiError = (error) => {
    if (error.response && error.response.status === 401) {
        console.error("🔴 [AUTH ERROR] Upstox access token is invalid or expired.");
        upstoxAccessToken = null;
        if (fs.existsSync(tokenFilePath)) {
            fs.unlinkSync(tokenFilePath);
            console.log("🗑️ Deleted expired token file. Please re-authenticate.");
        }
    } else {
        console.error("🔴 [API ERROR]", error.message);
    }
};

// --- CLEANED UP LOGIC ---
// This function now ONLY reads the local file you downloaded.
const getInstruments = async () => {
    try {
        if (fs.existsSync(instrumentsFilePath)) {
            console.log("✅ [INSTRUMENTS] Reading local instrument file...");
            const instruments = JSON.parse(fs.readFileSync(instrumentsFilePath, 'utf-8'));
            console.log(`✅ [INSTRUMENTS] Successfully loaded ${instruments.length} instruments from file.`);
            return instruments;
        } else {
            // This error will show if the file is missing from the temp folder.
            console.error("🔴 CRITICAL: Instrument file not found at:", instrumentsFilePath);
            console.error("Please ensure 'nse_equity_instruments.json' is inside the 'server/temp' folder.");
            return []; // Return empty to prevent crashes
        }
    } catch (error) {
        console.error("🔴 CRITICAL: Error reading or parsing the instrument file.", error);
        return [];
    }
};

const getMarketData = async (req, res) => {
    if (!upstoxAccessToken) {
        return res.status(401).json({ success: false, message: "Upstox API not authenticated." });
    }
    try {
        const allInstruments = await getInstruments();
        if (allInstruments.length === 0) {
            return res.status(500).json({ success: false, message: "Instrument list is empty." });
        }
        const instrumentKeys = allInstruments.map(instrument => instrument.instrument_key);

        const response = await axios.get(`https://api-v2.upstox.com/market-quote/quotes?instrument_key=${instrumentKeys.slice(0, 500).join(',')}`, {
            headers: {
                'Authorization': `Bearer ${upstoxAccessToken}`,
                'Api-Version': '2.0',
                'Accept': 'application/json'
            }
        });
        
        const marketData = Object.values(response.data.data).map(stock => ({
            instrumentKey: stock.instrument_key,
            symbol: stock.ohlc ? stock.ohlc.symbol : 'N/A',
            ltp: stock.last_price,
            change: stock.change,
            changePercent: stock.net_change,
            volume: stock.volume,
        }));

        res.status(200).json({ success: true, data: marketData });
    } catch (error) {
        handleApiError(error);
        res.status(500).json({ success: false, message: "Internal server error." });
    }
};

const getStockBySymbol = async (req, res) => {
    if (!upstoxAccessToken) {
        return res.status(401).json({ success: false, message: "Upstox API not authenticated." });
    }
    try {
        const { symbol } = req.params;
        const instruments = await getInstruments();
        const stockInfo = instruments.find(s => s.tradingsymbol.toLowerCase() === symbol.toLowerCase());

        if (stockInfo) {
            const response = await axios.get(`https://api-v2.upstox.com/market-quote/quotes?instrument_key=${stockInfo.instrument_key}`, {
                headers: {
                    'Authorization': `Bearer ${upstoxAccessToken}`,
                    'Api-Version': '2.0',
                    'Accept': 'application/json'
                }
            });
            const stockData = response.data.data[stockInfo.instrument_key];
            res.status(200).json({ success: true, data: stockData });
        } else {
            res.status(404).json({ success: false, message: "Stock not found" });
        }
    } catch (error) {
        handleApiError(error);
        res.status(500).json({ success: false, message: "Internal server error." });
    }
};

module.exports = {
    getMarketData,
    getStockBySymbol,
    getInstruments,
    setAccessToken
};
// server/controllers/MarketController.js

const fs = require('fs');
const path = require('path');
const axios = require('axios');

const instrumentsFilePath = path.join(__dirname, '..', 'temp', 'nse_equity_instruments.json');

/**
 * Generates realistic, randomized market data for development purposes.
 */
const generateSimulatedData = (allInstruments) => {
    console.log("📈 Generating simulated market data for development.");
    if (!allInstruments || allInstruments.length === 0) return [];

    return allInstruments.map(stock => {
        const lastPrice = stock.last_price || (Math.random() * 4000 + 50);
        const changePercent = (Math.random() - 0.5) * 10;
        const change = (lastPrice * changePercent) / 100;
        const ltp = lastPrice + change;

        return {
            instrumentKey: stock.instrument_key,
            name: stock.name,
            symbol: stock.tradingsymbol,
            sector: stock.gsector || 'N/A',
            ltp,
            change,
            changePercent,
            volume: Math.floor(Math.random() * 5000000),
        };
    });
};

const getInstruments = async () => {
    const tempDir = path.dirname(instrumentsFilePath);
    if (!fs.existsSync(tempDir)) {
        fs.mkdirSync(tempDir, { recursive: true });
    }

    if (fs.existsSync(instrumentsFilePath)) {
        const fileStats = fs.statSync(instrumentsFilePath);
        if (new Date().getTime() - fileStats.mtime.getTime() < 24 * 60 * 60 * 1000) {
            return JSON.parse(fs.readFileSync(instrumentsFilePath, 'utf-8'));
        }
    }

    try {
        console.log("🔄 [API] Fetching new instrument list from Upstox...");
        // FIX: The URL was incorrect, causing a 404 error. This is the correct endpoint.
        const response = await axios.get('https://api.upstox.com/v2/instrument/NSE_EQ');
        fs.writeFileSync(instrumentsFilePath, JSON.stringify(response.data.data, null, 2));
        console.log("✅ [API] Successfully cached new instrument list.");
        return response.data.data;
    } catch (error) {
        console.error("🔴 CRITICAL ERROR fetching instrument list:", error.message);
        if (fs.existsSync(instrumentsFilePath)) {
            console.warn("⚠️ [Fallback] Serving stale instrument data from cache.");
            return JSON.parse(fs.readFileSync(instrumentsFilePath, 'utf-8'));
        }
        return [];
    }
};

const getMarketData = async (req, res) => {
    try {
        const allInstruments = await getInstruments();
        const simulatedData = generateSimulatedData(allInstruments);
        res.status(200).json({ success: true, data: simulatedData });
    } catch (error) {
        console.error("🔴 Error in getMarketData endpoint:", error.message);
        res.status(500).json({ success: false, message: "Internal server error." });
    }
};

const getStockBySymbol = async (req, res) => {
    try {
        const { symbol } = req.params;
        const instruments = await getInstruments();
        const stock = instruments.find(s => s.tradingsymbol.toLowerCase() === symbol.toLowerCase());

        if (stock) {
            const simulatedStock = generateSimulatedData([stock])[0];
            res.status(200).json({ success: true, data: simulatedStock });
        } else {
            res.status(404).json({ success: false, message: "Stock not found" });
        }
    } catch (error) {
        console.error("🔴 Error in getStockBySymbol endpoint:", error.message);
        res.status(500).json({ success: false, message: "Internal server error." });
    }
};

module.exports = {
    getMarketData,
    getStockBySymbol,
    getInstruments,
};
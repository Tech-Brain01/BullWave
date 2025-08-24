// server/routes/AuthRoute.js

const { Router } = require('express');
const axios = require('axios');
const { signup, login } = require('../Controllers/AuthController');
const { userVerification } = require('../Middlewares/AuthMiddleware');
const router = Router();

// Your existing routes
router.post('/signup', signup);
router.post('/login', login);
router.post('/', userVerification);

// ------------------ UPSTOX AUTHENTICATION ROUTES ------------------

const redirectUri = process.env.NODE_ENV === 'production' 
  ? 'https://your-backend.onrender.com/auth/upstox/callback'
  : 'http://localhost:3001/auth/upstox/callback';


// 1. Redirect to Upstox for login
router.get('/auth/upstox', (req, res) => {
    const params = new URLSearchParams({
        client_id: process.env.API_KEY,
        redirect_uri: redirectUri,
        response_type: 'code',
    });
    res.redirect(`https://api-v2.upstox.com/login/authorization/dialog?${params.toString()}`);
});

// 2. Handle the callback from Upstox
router.get('/auth/upstox/callback', async (req, res) => {
    const { code } = req.query;

    if (!code) {
        return res.status(400).send('Authorization code is missing');
    }

    try {
        const response = await axios.post('https://api-v2.upstox.com/login/authorization/token', new URLSearchParams({
            code,
            client_id: process.env.API_KEY,
            client_secret: process.env.API_SECRET,
            redirect_uri: redirectUri,
            grant_type: 'authorization_code',
        }), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Api-Version': '2.0'
            }
        });

        const { access_token } = response.data;

        // ❗ **IMPORTANT:** Securely store the access_token in your database
        // associated with the logged-in user. For now, we'll just log it.
        console.log('Upstox Access Token:', access_token);

        // Redirect to your frontend dashboard
        res.redirect('http://localhost:3000/dashboard');

    } catch (error) {
        console.error('Error getting access token from Upstox:', error.response ? error.response.data : error.message);
        res.status(500).send('Error getting access token from Upstox');
    }
});

// --- ADD THIS NEW DASHBOARD ROUTE ---
router.get('/dashboard', userVerification, (req, res) => {
  // The userVerification middleware has already confirmed the user is logged in.
  // The user's information is attached to the request object (req.user).
  
  // You can fetch real data from your database here.
  // For now, we'll send back some sample data.
  res.status(200).json({
    success: true,
    message: `Welcome to your dashboard, ${req.user.username}!`,
    data: {
      portfolioValue: Math.floor(Math.random() * 100000),
      totalGain: (Math.random() * 5000 - 1000).toFixed(2),
      watchlist: ["RELIANCE", "TCS", "HDFCBANK", "INFY"]
    }
  });
});


router.get('/api/market-data', async (req, res) => {
  try {
    const instruments = [
      "NSE_INDEX|Nifty 50",
      "NSE_INDEX|Nifty Bank",
      "NSE_EQ|INE002A01018", // Reliance
      "NSE_EQ|INE467B01029", // TCS
      "NSE_EQ|INE090A01021", // HDFC Bank
      "NSE_EQ|INE009A01021", // ICICI Bank
    ].join(',');

    const accessToken = "eyJ0eXAiOiJKV1QiLCJrZXlfaWQiOiJza192MS4wIiwiYWxnIjoiSFMyNTYifQ.eyJzdWIiOiI0NkNLTkwiLCJqdGkiOiI2ODg0YmNmM2JiZWI1ODQ1YWMzYzc2NzkiLCJpc011bHRpQ2xpZW50IjpmYWxzZSwiaXNQbHVzUGxhbiI6dHJ1ZSwiaWF0IjoxNzUzNTI5NTg3LCJpc3MiOiJ1ZGFwaS1nYXRld2F5LXNlcnZpY2UiLCJleHAiOjE3NTM1NjcyMDB9.PS4GBQCb5q7Guksnp40OerGDjy-qS8U1FxmYXpl86y8";

    if (!accessToken || accessToken === "your_valid_upstox_access_token") {
        return res.status(401).json({ success: false, message: "Server is missing a valid Upstox API token." });
    }

    const response = await axios.get(`https://api-v2.upstox.com/market-quote/quotes?instrument_key=${instruments}`, {
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Api-Version': '2.0',
            'Accept': 'application/json'
        }
    });

    // --- FIX: Correctly map the response object with fallback values ---
     const marketData = Object.entries(response.data.data).map(([instrumentKey, stock]) => ({
      instrumentKey: instrumentKey, 
      symbol: stock.symbol,
      price: stock.last_price,
      change: stock.change,
      changePercent: stock.change_percentage || stock.net_change || 0, 
      // Ensure 'name' exists, fallback to symbol
      name: stock.name || stock.symbol // <-- THIS IS THE FIX
    }));
    
    res.status(200).json({ success: true, data: marketData });

  } catch (error) {
    console.error("🔴 Error fetching EOD market data:", error.response ? error.response.data : error.message);
    res.status(500).json({ success: false, message: "Failed to fetch market data." });
  }
});


module.exports = router;
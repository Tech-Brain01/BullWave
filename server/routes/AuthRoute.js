// server/routes/AuthRoute.js

const { Router } = require('express');
const axios = require('axios');
const { signup, login } = require('../controllers/AuthController');
const { userVerification } = require('../Middlewares/AuthMiddleware');
const router = Router();

// Your existing routes
router.post('/signup', signup);
router.post('/login', login);
router.post('/', userVerification);

// ------------------ UPSTOX AUTHENTICATION ROUTES ------------------

// 1. Redirect to Upstox for login
router.get('/auth/upstox', (req, res) => {
    console.log("✅ [STEP 1] Redirecting to Upstox login page...");
    const redirectUri = 'http://localhost:3001/auth/upstox/callback';
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
        console.error("🔴 [STEP 2 FAILED] Did not receive authorization code from Upstox.");
        return res.status(400).send('Authorization code is missing. Please try authenticating again.');
    }

    console.log("✅ [STEP 2] Received authorization code from Upstox:", code);
    console.log("⏳ [STEP 3] Exchanging authorization code for an access token...");

    try {
        const tokenResponse = await axios.post('https://api-v2.upstox.com/login/authorization/token', new URLSearchParams({
            code,
            client_id: process.env.API_KEY,
            client_secret: process.env.API_SECRET,
            redirect_uri: 'http://localhost:3001/auth/upstox/callback',
            grant_type: 'authorization_code',
        }), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Api-Version': '2.0',
                 'accept': 'application/json'
            }
        });

        const accessToken = tokenResponse.data.access_token;
        if (!accessToken) {
             console.error("🔴 [STEP 3 FAILED] Response received, but no access_token found.");
             return res.status(500).send("Could not retrieve access token from Upstox.");
        }
        console.log("✅ [STEP 3] Successfully received access token!");

        // Forward the access token to our main server endpoint to handle it
        await axios.post(`http://localhost:${process.env.PORT || 3001}/upstox-token`, {
            access_token: accessToken
        });

        // Redirect to your frontend dashboard
        res.redirect('http://localhost:5173/dashboard');

    } catch (error) {
        console.error("🔴 [STEP 3 FAILED] Error exchanging code for access token:", error.response ? error.response.data : error.message);
        res.status(500).send('Error getting access token from Upstox. Check server logs.');
    }
});


module.exports = router;
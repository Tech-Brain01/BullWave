const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
// CORRECTED: Destructuring the imports to get the actual models
const  User  = require('../model/User');
const  Portfolio  = require('../model/Portfolio');
const  Transaction  = require('../model/Transaction');
const  StockMetadata  = require('../model/Metadata');


router.get('/database', async (req, res) => {
  try {
    // === 1. CLEAR ALL EXISTING DATA ===
    console.log('Clearing old data...');
    await Portfolio.deleteMany({});
    await Transaction.deleteMany({});
    await User.deleteMany({});
    await StockMetadata.deleteMany({});
      console.log('Old data cleared.');

    // === 2. SEED STOCK METADATA (GLOBAL DATA) ===
    const stockMetadataToSeed = [
      { tickerSymbol: "RELIANCE.BSE", companyName: "Reliance Industries Ltd", sector: "Energy", industry: "Oil & Gas", logoUrl: "https://companiesmarketcap.com/img/company-logos/64/RELIANCE.NS.png" },
      { tickerSymbol: "TCS.BSE", companyName: "Tata Consultancy Services Ltd", sector: "Technology", industry: "IT Services & Consulting", logoUrl: "https://companiesmarketcap.com/img/company-logos/64/TCS.NS.png" },
      { tickerSymbol: "HDFCBANK.BSE", companyName: "HDFC Bank Ltd", sector: "Financials", industry: "Banks", logoUrl: "https://companiesmarketcap.com/img/company-logos/64/HDB.png" },
      { tickerSymbol: "INFY.BSE", companyName: "Infosys Ltd", sector: "Technology", industry: "IT Services & Consulting", logoUrl: "https://companiesmarketcap.com/img/company-logos/64/INFY.NS.png" },
      { tickerSymbol: "HINDUNILVR.BSE", companyName: "Hindustan Unilever Ltd", sector: "Consumer Staples", industry: "Household & Personal Products", logoUrl: "https://companiesmarketcap.com/img/company-logos/64/HINDUNILVR.NS.png" }
    ];
    await StockMetadata.insertMany(stockMetadataToSeed);
    console.log('Stock Metadata seeded.');

    // === 3. SEED USERS ===
      // 3. Seed Users (this will hash passwords automatically via the pre-save hook)
    console.log('Seeding users...');
    const priya = await User.create({ 
      username: 'Priya Sharma', 
      email: 'priya.sharma@example.com', 
      password: 'password123' 
    });

    const rohan = await User.create({ 
      username: 'Rohan Verma', 
      email: 'rohan.verma@example.com', 
      password: 'password456' 
    });
    console.log('Users seeded successfully.');

    // 4. FIX: Seed Portfolios using the new User IDs
    console.log('Seeding portfolios...');
    await Portfolio.create({
      userId: priya._id, // <-- Use the actual ID from the created user
      holdings: [
        { tickerSymbol: 'RELIANCE.BSE', quantity: 10, averageBuyPrice: 2800 },
        { tickerSymbol: 'TCS.BSE', quantity: 5, averageBuyPrice: 3500 }
      ],
      // You can add a cash balance if your model supports it
      // cashBalance: 50000 
    });

    await Portfolio.create({
      userId: rohan._id, // <-- Use the actual ID from the created user
      holdings: [
        { tickerSymbol: 'HDFCBANK.BSE', quantity: 20, averageBuyPrice: 1500 }
      ]
    });
    console.log('Portfolios seeded successfully.');


    // 5. FIX: Seed Transactions using the new User IDs
    console.log('Seeding transactions...');
    await Transaction.create([
      { userId: priya._id, tickerSymbol: 'RELIANCE.BSE', transactionType: 'BUY', quantity: 10, price: 2800 },
      { userId: priya._id, tickerSymbol: 'TCS.BSE', transactionType: 'BUY', quantity: 5, price: 3500 },
      { userId: rohan._id, tickerSymbol: 'HDFCBANK.BSE', transactionType: 'BUY', quantity: 20, price: 1500 }
    ]);
    console.log('Transactions seeded successfully.');

    res.status(200).json({ message: 'Database has been successfully reset and seeded!' });

  } catch (error) {
    console.error('Error seeding database:', error);
    res.status(500).json({ error: 'Failed to seed database.', details: error.message });
  }
});

module.exports = router;
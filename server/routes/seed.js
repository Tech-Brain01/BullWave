const express = require('express');
const router = express.Router();
// CORRECTED: Destructuring the imports to get the actual models
const { User } = require('../model/User');
const { Portfolio } = require('../model/Portfolio');
const { Transaction } = require('../model/Transaction');
const { StockMetadata } = require('../model/Metadata');

/**
 * @route   GET /api/seed/database
 * @desc    Resets and seeds the entire database with test data.
 * @access  Public (for development purposes only)
 */
router.get('/database', async (req, res) => {
  try {
    // === 1. CLEAR ALL EXISTING DATA ===
    console.log('Clearing old data...');
    await Portfolio.deleteMany({});
    await Transaction.deleteMany({});
    await User.deleteMany({});
    await StockMetadata.deleteMany({});

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
    // In a real app, passwords would be hashed with bcryptjs
    const usersToSeed = [
      { username: 'priya_sharma', email: 'priya.sharma@example.com', password: 'password123', walletBalance: 85000 },
      { username: 'rohan_verma', email: 'rohan.verma@example.com', password: 'password456', walletBalance: 150000 }
    ];
    const createdUsers = await User.insertMany(usersToSeed);
    console.log('Users seeded.');

    // === 4. SEED PORTFOLIOS using the new User IDs ===
    const portfoliosToSeed = [
      {
        userId: createdUsers[0]._id, // Priya Sharma's new ID
        holdings: [
          { tickerSymbol: "RELIANCE.BSE", quantity: 10, averageBuyPrice: 2800 },
          { tickerSymbol: "TCS.BSE", quantity: 5, averageBuyPrice: 3500 }
        ]
      },
      {
        userId: createdUsers[1]._id, // Rohan Verma's new ID
        holdings: [
          { tickerSymbol: "HDFCBANK.BSE", quantity: 20, averageBuyPrice: 1500 }
        ]
      }
    ];
    await Portfolio.insertMany(portfoliosToSeed);
    console.log('Portfolios seeded.');

    // === 5. SEED TRANSACTIONS using the new User IDs ===
    const transactionsToSeed = [
      { userId: createdUsers[0]._id, tickerSymbol: "RELIANCE.BSE", transactionType: "BUY", quantity: 10, price: 2800, date: new Date('2024-03-15T10:00:00Z') },
      { userId: createdUsers[0]._id, tickerSymbol: "TCS.BSE", transactionType: "BUY", quantity: 5, price: 3500, date: new Date('2024-03-18T11:30:00Z') },
      { userId: createdUsers[1]._id, tickerSymbol: "HDFCBANK.BSE", transactionType: "BUY", quantity: 20, price: 1500, date: new Date('2024-04-01T09:45:00Z') }
    ];
    await Transaction.insertMany(transactionsToSeed);
    console.log('Transactions seeded.');

    res.status(200).json({ message: "Database has been successfully reset and seeded!" });

  } catch (error) {
    console.error('Error seeding database:', error);
    res.status(500).json({ error: 'Failed to seed database.', details: error.message });
  }
});

module.exports = router;
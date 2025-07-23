const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },

  tickerSymbol: {
    type: String,
    required: true,
    uppercase: true,
  },

  transactionType: {
    type: String,
    enum: ['BUY', 'SELL'],
    required: true,
  },

  quantity: {
    type: Number,
    required: true,
    min: [0.00001, 'Transaction quantity must be positive.'], 
  },

  price: {
    type: Number,
    required: true,
  },

  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Transaction', TransactionSchema);
const { Schema, default: mongoose } = require('mongoose');

const PortfolioSchema = new Schema({
    // CORRECTED: Changed 'userID' to the standard 'userId' (camelCase)
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    holdings: [{
        tickerSymbol: {
            type: String,
            required: true,
            uppercase: true
        },
        quantity: {
            type: Number,
            required: true
        },
        averageBuyPrice: {
            type: Number,
            required: true
        },
    }]
});

module.exports = { PortfolioSchema };
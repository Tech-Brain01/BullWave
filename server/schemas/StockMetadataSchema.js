const {Schema} = require('mongoose');

const StockMetadataSchema = new Schema({
  tickerSymbol: {
    type: String,
    required: true,
    unique: true, 
    uppercase: true,
  },
  companyName: {
    type: String,
    required: true,
  },
  sector: {
    type: String,
    default: 'N/A', 
  },
  industry: {
    type: String,
    default: 'N/A',
  },
  logoUrl: {
    type: String,
  },
}, {
  timestamps: true,
});

module.exports = {StockMetadataSchema};

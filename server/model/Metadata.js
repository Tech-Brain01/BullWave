const {model} = require('mongoose');

const {StockMetadataSchema} = require('../schemas/StockMetadataSchema');    
const StockMetadata = model('StockMetadata', StockMetadataSchema);

module.exports = {StockMetadata};

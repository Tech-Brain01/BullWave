const {model} = require('mongoose');
const {PortfolioSchema} = require('../schemas/PortfolioSchema');

const Portfolio = model('holding', PortfolioSchema);

module.exports = {Portfolio};

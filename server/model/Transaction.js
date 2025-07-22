const {model} = require('mongoose');

const {TransactionSchema} = require('../schemas/Transaction');    

const Transaction = model('Transaction', TransactionSchema);

module.exports = {Transaction};
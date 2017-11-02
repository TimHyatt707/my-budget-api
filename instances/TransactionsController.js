const TransactionsController = require("../controllers/TransactionsController");

module.exports = new TransactionsController({
  TransactionService: require("./TransactionService")
});

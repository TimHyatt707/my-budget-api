const TransactionService = require("../services/TransactionService");

module.exports = new TransactionService({
  TransactionRepository: require("./TransactionRepository")
});

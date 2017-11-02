const TransactionRepository = require("../repositories/TransactionRepository");

module.exports = new TransactionRepository({
  db: require("./defaultDatabase")
});

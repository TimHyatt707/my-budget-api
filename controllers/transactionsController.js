const TransactionService = require("./../services/TransactionService");

class TransactionsController {
  async updateTransactionById(req, res, next) {
    try {
      const transactionId = parseInt(req.params.transactionid);
      const transaction = await TransactionService.getTransactionByID(
        transactionId
      );
      res.json(transaction);
    } catch (error) {
      next(error);
    }
  }
  async deleteTransactionById(req, res, next) {
    try {
      const transactionId = parseInt(req.params.transactionid);
      const transaction = await TransactionService.deleteTransactionById(
        transactionId
      );
      res.json(transaction);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = TransactionsController;

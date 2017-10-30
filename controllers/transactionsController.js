const TransactionService = require("./../services/TransactionService");
const transactionService = new TransactionService();

class TransactionsController {
  async updateTransactionById(req, res, next) {
    try {
      const transactionId = parseInt(req.params.transactionid);
      const attributes = req.body;
      const transaction = await transactionService.update(
        transactionId,
        attributes
      );
      res.json(transaction);
    } catch (error) {
      next(error);
    }
  }
  async deleteTransactionById(req, res, next) {
    try {
      const transactionId = parseInt(req.params.transactionid);
      const transaction = await transactionService.delete(transactionId);
      res.json(transaction);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = TransactionsController;

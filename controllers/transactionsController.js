const transactionService = require("./../services/transactionService");

class transactionsController {
  async updateTransactionById(req, res, next) {
    try {
      const transactionId = parseInt(req.params.transactionid);
      const transaction = await transactionService.getTransactionByID(
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
      const transaction = await transactionService.deleteTransactionById(
        transactionId
      );
      res.json(transaction);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = transactionsController;

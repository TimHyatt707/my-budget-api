class TransactionsController {
  constructor({ TransactionService }) {
    this._transactionService = TransactionService;
    this.updateTransactionById = this.updateTransactionById.bind(this);
    this.deleteTransactionById = this.deleteTransactionById.bind(this);
  }
  async updateTransactionById(req, res, next) {
    try {
      const transactionId = parseInt(req.params.transactionid);
      const attributes = Object.assign({}, req.body);
      const token = req.get("Authorization");
      const transaction = await this._transactionService.update(
        transactionId,
        attributes,
        token
      );
      res.json(transaction);
    } catch (error) {
      if (error === "Forbidden") {
        res.status(403);
      } else {
        res.status(400);
      }
    }
  }
  async deleteTransactionById(req, res, next) {
    try {
      const transactionId = parseInt(req.params.transactionid);
      const token = req.get("Authorization");
      const userId = req.get("Authenticated");
      const transaction = await this._transactionService.delete(
        transactionId,
        userId,
        token
      );
      res.json(transaction);
    } catch (error) {
      if (error === "Forbidden") {
        res.status(403);
      } else res.status(400);
    }
  }
}

module.exports = TransactionsController;

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
      if (
        transaction.message === "invalid signature" ||
        transaction.message === "jwt must be provided" ||
        transaction === "invalid signature"
      ) {
        res.status(401).json({ message: "Unauthorized" });
      } else res.json(transaction);
    } catch (error) {
      next(error);
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
      if (
        transaction.message === "invalid signature" ||
        transaction.message === "jwt must be provided" ||
        transaction === "invalid signature"
      ) {
        res.status(401).json({ message: "Unauthorized" });
      } else res.json(transaction);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = TransactionsController;

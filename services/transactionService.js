const TransactionRepository = require("./../repositories/TransactionRepository");

class TransactionService {
  async getByUserId(id) {
    try {
      //TO DO: User authentication
      const categories = await TransactionRepository.getByUser(id);
      return categories;
    } catch (error) {
      //TO DO: error handling
      error;
    }
  }
  async createTransaction(attributes) {
    try {
      const attributes = Object.assign({}, attributes);
      const transaction = await TransactionRepository.create(attributes);
      return transaction;
    } catch (error) {
      error;
    }
  }
  async update(id, changes) {
    try {
      const attributes = Object.assign({}, changes);
      const updatedTransaction = await TransactionRepository.update(attributes);
      return updatedTransaction;
    } catch (error) {
      error;
    }
  }
  async delete(id) {
    try {
      const deletedTransaction = await TransactionRepository.delete(id);
      return deletedTransaction;
    } catch (error) {
      error;
    }
  }
}

module.exports = TransactionService;

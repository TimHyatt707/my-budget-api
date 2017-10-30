const TransactionRepository = require("./../repositories/TransactionRepository");
const transactionRepository = new TransactionRepository();

class TransactionService {
  async getByUserId(id) {
    try {
      //TO DO: User authentication
      const categories = await transactionRepository.getByUser(id);
      return categories;
    } catch (error) {
      //TO DO: error handling
      return error;
    }
  }
  async createTransaction(attributes) {
    try {
      const transactionObject = Object.assign({}, attributes);
      const transaction = await transactionRepository.create(transactionObject);
      return transaction;
    } catch (error) {
      return error;
    }
  }
  async update(id, changes) {
    try {
      const attributes = Object.assign({}, changes);
      const updatedTransaction = await transactionRepository.update(attributes);
      return updatedTransaction;
    } catch (error) {
      return error;
    }
  }
  async delete(id) {
    try {
      const deletedTransaction = await transactionRepository.delete(id);
      return deletedTransaction;
    } catch (error) {
      return error;
    }
  }
}

module.exports = TransactionService;

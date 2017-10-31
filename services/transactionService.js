const TransactionRepository = require("./../repositories/TransactionRepository");
const transactionRepository = new TransactionRepository();
const jwt = require("jsonwebtoken");
const secret = require("./../env");

class TransactionService {
  async getByUserId(id, authentication) {
    try {
      const accessToken = await jwt.verify(
        authentication.token,
        secret.JWT_KEY,
        {
          sub: id
        }
      );
      if (accessToken.sub === id) {
        const transactions = await transactionRepository.getByUser(id);
        return transactions;
      } else throw "invalid signature";
    } catch (error) {
      return error;
    }
  }
  async createTransaction(attributes, authentication) {
    try {
      const accessToken = await jwt.verify(
        authentication.token,
        secret.JWT_KEY,
        {
          sub: attributes.user_id
        }
      );
      if (accessToken.sub === attributes.user_id) {
        const transactionObject = Object.assign({}, attributes);
        const transaction = await transactionRepository.create(
          transactionObject
        );
        return transaction;
      } else throw "invalid signature";
    } catch (error) {
      return error;
    }
  }
  async update(id, changes, token) {
    try {
      const attributes = Object.assign({}, changes);
      const updatedTransaction = await transactionRepository.update(
        id,
        attributes
      );
      return updatedTransaction;
    } catch (error) {
      return error;
    }
  }
  async delete(id, token) {
    try {
      const deletedTransaction = await transactionRepository.delete(id);
      return deletedTransaction;
    } catch (error) {
      return error;
    }
  }
}

module.exports = TransactionService;

const TransactionRepository = require("./../repositories/TransactionRepository");
const transactionRepository = new TransactionRepository();
const jwt = require("jsonwebtoken");
const secret = require("./../env");

class TransactionService {
  async getByUserId(id, authentication) {
    try {
      const accessToken = await jwt.verify(authentication, secret.JWT_KEY, {
        sub: id
      });
      if (accessToken.sub === id) {
        const transactions = await transactionRepository.getByUser(id);
        return transactions;
      } else throw "invalid signature";
    } catch (error) {
      return error;
    }
  }
  async createTransaction(id, attributes, authentication) {
    try {
      const accessToken = await jwt.verify(authentication, secret.JWT_KEY, {
        sub: id
      });
      if (accessToken.sub === id) {
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
  async update(id, changes, authentication) {
    try {
      const accessToken = jwt.verify(authentication, secret.JWT_KEY, {
        sub: id
      });
      if (accessToken.sub === id) {
        const attributes = Object.assign({}, changes);
        const updatedTransaction = await transactionRepository.update(
          id,
          attributes
        );
        return updatedTransaction;
      } else throw "invalid signature";
    } catch (error) {
      return error;
    }
  }
  async delete(id, authentication) {
    try {
      const accessToken = jwt.verify(authentication, secret.JWT_KEY, {
        sub: id
      });
      if (accessToken.sub === id) {
        const deletedTransaction = await transactionRepository.delete(id);
        return deletedTransaction;
      } else throw "invalid signature";
    } catch (error) {
      return error;
    }
  }
}

module.exports = TransactionService;

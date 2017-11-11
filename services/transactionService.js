const jwt = require("jsonwebtoken");
const secret = require("./../env");

class TransactionService {
  constructor({ TransactionRepository, CategoryRepository }) {
    this._transactionRepository = TransactionRepository;
    this._categoryRepository = CategoryRepository;
    this.getByUserId = this.getByUserId.bind(this);
    this.createTransaction = this.createTransaction.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }
  async getByUserId(id, authentication) {
    try {
      if (isNaN(id)) {
        throw new Error("Bad Request");
      }
      const accessToken = await jwt.verify(authentication, secret.JWT_KEY, {
        sub: id
      });
      if (accessToken.sub === id) {
        const transactions = await this._transactionRepository.getByUser(id);
        const categories = await this._categoryRepository.getByUser(id);
        let returnedTransactions = transactions.map(transaction => {
          categories.map(category => {
            if (transaction.category_id === category.id) {
              delete transaction.category_id;
              transaction.category = category.name;
            }
            return category;
          });
          return transaction;
        });
        return returnedTransactions;
      } else throw new Error("Forbidden");
    } catch (error) {
      return error;
    }
  }
  async createTransaction(userId, attributes, authentication) {
    try {
      if (isNaN(userId)) {
        throw new Error("Bad Request");
      }
      const accessToken = await jwt.verify(authentication, secret.JWT_KEY, {
        sub: userId
      });
      if (accessToken.sub === userId) {
        const transactionObject = Object.assign({}, attributes);
        const categories = await this._categoryRepository.getByUser(userId);
        for (let i = 0; i < categories.length; i++) {
          if (transactionObject.category === categories[i].name) {
            delete transactionObject.category;
            transactionObject.category_id = categories[i].id;
            transactionObject.user_id = userId;
            const transaction = await this._transactionRepository.create(
              transactionObject
            );
            delete transaction.category_id;
            transaction.category = categories[i].name;
            return transaction;
          }
        }
        throw new Error("Bad Request");
      } else throw new Error("Forbidden");
    } catch (error) {
      return error;
    }
  }
  async update(id, changes, authentication) {
    try {
      if (isNaN(id)) {
        throw new Error("Bad Request");
      }
      const accessToken = jwt.verify(authentication, secret.JWT_KEY, {
        sub: changes.user_id
      });
      if (accessToken.sub === ~~changes.user_id) {
        const attributes = Object.assign({}, changes);
        const category = await this._categoryRepository.getByName(
          attributes.category
        );
        delete attributes.category;
        attributes.category_id = category[0].id;
        const updatedTransaction = await this._transactionRepository.update(
          id,
          attributes
        );
        delete updatedTransaction.category_id;
        updatedTransaction.category = category[0].name;
        return updatedTransaction;
      } else throw new Error("Forbidden");
    } catch (error) {
      return error;
    }
  }
  async delete(id, userId, authentication) {
    try {
      if (isNaN(id)) {
        throw new Error("Bad Request");
      }
      const accessToken = jwt.verify(authentication, secret.JWT_KEY, {
        sub: userId
      });
      if (accessToken.sub === ~~userId) {
        const deletedTransaction = await this._transactionRepository.delete(id);
        return deletedTransaction;
      } else throw Error("Forbidden");
    } catch (error) {
      return error;
    }
  }
}

module.exports = TransactionService;

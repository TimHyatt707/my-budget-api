const UserService = require("./../services/UserService");
const TransactionService = require("./../services/TransactionService");
const CategoryService = require("./../services/CategoryService");

class UsersController {
  async getUserById(req, res, next) {
    try {
      const userId = parseInt(req.params.userid);
      const user = await UserService.getUserById(userId);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }
  async getTransactionsByUser(req, res, next) {
    try {
      const userId = parseInt(req.params.userid);
      const transactions = await TransactionService.getByUserId(userId);
      res.json(transactions);
    } catch (error) {
      next(error);
    }
  }
  async getCategoriesByUser(req, res, next) {
    try {
      const userId = parseInt(req.params.userid);
      const categories = await CategoryService.getByUserId(userId);
      res.json(categories);
    } catch (error) {
      next(error);
    }
  }
  async createUser(req, res, next) {
    try {
      const attributes = req.body;
      const user = await UserService.createUser(attributes);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }
  async createTransaction(req, res, next) {
    try {
      const userId = req.params.userid;
      const transaction = await TransactionService.createTransaction(userId);
      res.json(transaction);
    } catch (error) {
      next(error);
    }
  }
  async createCategory(req, res, next) {
    try {
      const userId = req.params.userid;
      const category = await CategoryService.createCategory(userId);
      res.json(category);
    } catch (error) {
      next(error);
    }
  }
  async updateUser(req, res, next) {
    try {
      const changes = req.body;
      const userId = req.params.userid;
      const updatedUser = await UserService.updateUser(userId, changes);
      res.json(updatedUser);
    } catch (error) {
      next(error);
    }
  }
  async deleteUser(req, res, next) {
    try {
      const userId = req.params.userid;
      const deletedUser = await UserService.deleteUser(userId);
      res.json(deletedUser);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UsersController;

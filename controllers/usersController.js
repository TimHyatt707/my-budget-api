const UserService = require("./../services/UserService");
const TransactionService = require("./../services/TransactionService");
const CategoryService = require("./../services/CategoryService");
const userService = new UserService();
const categoryService = new CategoryService();
const transactionService = new TransactionService();

class UsersController {
  async getUserById(req, res, next) {
    try {
      const userId = parseInt(req.params.userid);
      const user = await userService.getUserById(userId);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }
  async getTransactionsByUser(req, res, next) {
    try {
      const userId = parseInt(req.params.userid);
      const transactions = await transactionService.getByUserId(userId);
      if (!transactions.length) {
        res.status(404);
      }
      res.json(transactions);
    } catch (error) {
      next(error);
    }
  }
  async getCategoriesByUser(req, res, next) {
    try {
      const userId = parseInt(req.params.userid);
      const categories = await categoryService.getByUserId(userId);
      if (!categories.length) {
        res.status(404);
      }
      res.json(categories);
    } catch (error) {
      next(error);
    }
  }
  async createUser(req, res, next) {
    try {
      const attributes = req.body;
      const user = await userService.createUser(attributes);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }
  async createTransaction(req, res, next) {
    try {
      const attributes = req.body;
      attributes.user_id = parseInt(req.params.userid);
      const transaction = await transactionService.createTransaction(
        attributes
      );
      res.json(transaction);
    } catch (error) {
      next(error);
    }
  }
  async createCategory(req, res, next) {
    try {
      const attributes = req.body;
      attributes.user_id = parseInt(req.params.userid);
      const category = await categoryService.createCategory(attributes);
      res.json(category);
    } catch (error) {
      next(error);
    }
  }
  async updateUser(req, res, next) {
    try {
      const changes = req.body;
      const userId = req.params.userid;
      const updatedUser = await userService.updateUser(userId, changes);
      res.json(updatedUser);
    } catch (error) {
      next(error);
    }
  }
  async deleteUser(req, res, next) {
    try {
      const userId = req.params.userid;
      const deletedUser = await userService.deleteUser(userId);
      res.json(deletedUser);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UsersController;

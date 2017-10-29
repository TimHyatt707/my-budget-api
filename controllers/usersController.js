const userService = require("./../services/userService");
const transactionService = require("./../services/transactionService");
const categoryService = require("./../services/categoryService");

class usersController {
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
      res.json(transactions);
    } catch (error) {
      next(error);
    }
  }
  async getCategoriesByUser(req, res, next) {
    try {
      const userId = parseInt(req.params.userid);
      const categories = await categoryService.getByUserId(userId);
      res.json(categories);
    } catch (error) {
      next(error);
    }
  }
  async createUser(req, res, next) {
    try {
      const userObject = req.body;
      const user = await userService.createUser(userObject);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }
  async createTransactionByUser(req, res, next) {
    try {
      const userId = req.params.userid;
      const transaction = await transactionService.createTransaction(userId);
      res.json(transaction);
    } catch (error) {
      next(error);
    }
  }
  async createCategoryByUser(req, res, next) {
    try {
      const userId = req.params.userid;
      const category = await categoryService.createCategory(userId);
      res.json(category);
    } catch (error) {
      next(error);
    }
  }
  async updateUser(req, res, next) {
    try {
      const changes = req.body;
      const updatedUser = await userService.updatedUser(changes);
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

module.exports = usersController;

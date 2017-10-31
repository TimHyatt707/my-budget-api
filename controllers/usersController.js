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
      const token = Object.assign({}, req.body);
      const user = await userService.getUserById(userId, token);
      if (
        user.message === "invalid signature" ||
        user === "invalid signature"
      ) {
        res.status(401).json({ message: "Unauthorized" });
      } else res.json(user);
    } catch (error) {
      next(error);
    }
  }
  async getTransactionsByUser(req, res, next) {
    try {
      const userId = parseInt(req.params.userid);
      const token = Object.assign({}, req.body);
      const transactions = await transactionService.getByUserId(userId, token);
      if (
        transactions.message === "invalid signature" ||
        transactions === "invalid signature"
      ) {
        res.status(401).json({ message: "Unauthorized" });
      } else res.json(transactions);
    } catch (error) {
      next(error);
    }
  }
  async getCategoriesByUser(req, res, next) {
    try {
      const userId = parseInt(req.params.userid);
      const token = Object.assign({}, req.body);
      const categories = await categoryService.getByUserId(userId, token);
      if (
        categories.message === "invalid signature" ||
        categories === "invalid signature"
      ) {
        res.status(401).json({ message: "Unauthorized" });
      } else res.json(categories);
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
      const attributes = Object.assign({}, req.body);
      const token = Object.assign({}, attributes);
      delete attributes.token;
      attributes.user_id = parseInt(req.params.userid);
      const transaction = await transactionService.createTransaction(
        attributes,
        token
      );
      if (
        transaction.message === "invalid signature" ||
        transaction === "invalid signature"
      ) {
        res.status(401).json({ message: "Unauthorized" });
      } else res.json(transaction);
    } catch (error) {
      next(error);
    }
  }
  async createCategory(req, res, next) {
    try {
      const attributes = req.body;
      const token = Object.assign({}, attributes.token);
      attributes.user_id = parseInt(req.params.userid);
      const category = await categoryService.createCategory(attributes, token);
      res.json(category);
    } catch (error) {
      next(error);
    }
  }
  async updateUser(req, res, next) {
    try {
      const changes = req.body;
      const token = Object.assign({}, changes.token);
      const userId = req.params.userid;
      const updatedUser = await userService.updateUser(userId, changes, token);
      res.json(updatedUser);
    } catch (error) {
      next(error);
    }
  }
  async deleteUser(req, res, next) {
    try {
      const userId = req.params.userid;
      const token = Object.assign({}, req.body);
      const deletedUser = await userService.deleteUser(userId, token);
      res.json(deletedUser);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UsersController;

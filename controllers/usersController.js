class UsersController {
  constructor({ userService, categoryService, transactionService }) {
    this._userService = userService;
    this._categoryService = categoryService;
    this._transactionService = transactionService;
    this.getUserById = this.getUserById.bind(this);
    this.getTransactionsByUser = this.getTransactionsByUser.bind(this);
    this.getCategoriesByUser = this.getCategoriesByUser.bind(this);
    this.createUser = this.createUser.bind(this);
    this.createTransaction = this.createTransaction.bind(this);
    this.createCategory = this.createCategory.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
  }
  async getUserById(req, res, next) {
    try {
      const token = req.get("Authorization");
      const user = await this._userService.getUserById(token);
      res.json(user);
    } catch (error) {
      if (error === "User not found") {
        res.status(404);
      } else if (error === "Bad token") {
        res.status(401);
      } else if (error === "Forbidden") {
        res.status(403);
      } else res.status(400);
    }
  }
  async getTransactionsByUser(req, res, next) {
    try {
      const userId = parseInt(req.params.userid);
      const token = req.get("Authorization");
      const transactions = await this._transactionService.getByUserId(
        userId,
        token
      );
      res.json(transactions);
    } catch (error) {
      if (error === "Forbidden") {
        res.status(403);
      } else res.status(400);
    }
  }
  async getCategoriesByUser(req, res, next) {
    try {
      const userId = parseInt(req.params.userid);
      const token = req.get("Authorization");
      const categories = await this._categoryService.getByUserId(userId, token);
      res.json(categories);
    } catch (error) {
      if (error === "Forbidden") {
        res.status(403);
      } else res.status(400);
    }
  }
  async createUser(req, res, next) {
    try {
      const attributes = req.body;
      const user = await this._userService.createUser(attributes);
      res.json(user);
    } catch (error) {
      res.sendStatus(400);
    }
  }
  async createTransaction(req, res, next) {
    try {
      const attributes = Object.assign({}, req.body);
      const token = req.get("Authorization");
      const userId = parseInt(req.params.userid);
      const transaction = await this._transactionService.createTransaction(
        userId,
        attributes,
        token
      );
      res.json(transaction);
    } catch (error) {
      if (error === "Forbidden") {
        res.status(403);
      } else res.status(400);
    }
  }
  async createCategory(req, res, next) {
    try {
      const attributes = req.body;
      const token = req.get("Authorization");
      const userId = parseInt(req.params.userid);
      attributes.user_id = userId;
      const category = await this._categoryService.createCategory(
        userId,
        attributes,
        token
      );
      res.json(category);
    } catch (error) {
      if (error === "Forbidden") {
        res.status(403);
      } else res.status(400);
    }
  }
  async updateUser(req, res, next) {
    try {
      const changes = req.body;
      const token = req.get("Authorization");
      const userId = req.params.userid;
      const updatedUser = await this._userService.updateUser(
        userId,
        changes,
        token
      );
      res.json(updatedUser);
    } catch (error) {
      if (error === "Forbidden") {
        res.status(403);
      } else res.status(400);
    }
  }
  async deleteUser(req, res, next) {
    try {
      const userId = req.params.userid;
      const token = req.get("Authorization");
      const deletedUser = await this._userService.deleteUser(userId, token);
      res.json(deletedUser);
    } catch (error) {
      if (error === "Forbidden") {
        res.status(403);
      } else res.status(400);
    }
  }
}

module.exports = UsersController;

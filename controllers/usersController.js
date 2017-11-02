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
      const userId = parseInt(req.params.userid);
      const token = req.get("Authorization");
      const user = await this._userService.getUserById(userId, token);
      if (
        user.message === "invalid signature" ||
        user.message === "jwt must be provided" ||
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
      const token = req.get("Authorization");
      const transactions = await this._transactionService.getByUserId(
        userId,
        token
      );
      if (
        transactions.message === "invalid signature" ||
        transactions.message === "jwt must be provided" ||
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
      const token = req.get("authorization");
      const categories = await this._categoryService.getByUserId(userId, token);
      if (
        categories.message === "invalid signature" ||
        categories.message === "jwt must be provided" ||
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
      const user = await this._userService.createUser(attributes);
      res.json(user);
    } catch (error) {
      next(error);
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
      if (
        transaction.message === "invalid signature" ||
        transaction.message === "jwt must be provided" ||
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
      const token = req.get("Authorization");
      const userId = parseInt(req.params.userid);
      attributes.user_id = userId;
      const category = await this._categoryService.createCategory(
        userId,
        attributes,
        token
      );
      if (
        category.message === "invalid signature" ||
        category.message === "jwt must be provided" ||
        category === "invalid signature"
      ) {
        res.status(401).json({ message: "Unauthorized" });
      } else res.json(category);
    } catch (error) {
      next(error);
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
      if (
        updatedUser.message === "invalid signature" ||
        updatedUser.message === "jwt must be provided" ||
        updatedUser === "invalid signature"
      ) {
        res.status(401).json({ message: "Unauthorized" });
      } else res.json(updatedUser);
    } catch (error) {
      next(error);
    }
  }
  async deleteUser(req, res, next) {
    try {
      const userId = req.params.userid;
      const token = req.get("Authorization");
      const deletedUser = await this._userService.deleteUser(userId, token);
      if (
        deletedUser.message === "invalid signature" ||
        deletedUser.message === "jwt must be provided" ||
        deletedUser === "invalid signature"
      ) {
        res.status(401).json({ message: "Unauthorized" });
      } else res.json(deletedUser);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UsersController;

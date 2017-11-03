const UsersController = require("../controllers/UsersController");

module.exports = new UsersController({
  userService: require("./UserService"),
  categoryService: require("./CategoryService"),
  transactionService: require("./TransactionService")
});

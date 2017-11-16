const UsersController = require("../controllers/UsersController");

module.exports = new UsersController({
  userService: require("./userService"),
  categoryService: require("./categoryService"),
  transactionService: require("./transactionService")
});

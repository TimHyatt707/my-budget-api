const UsersController = require("../controllers/UsersController");

module.exports = new UsersController({
  UserService: require("./UserService"),
  CategoryService: require("./CategoryService"),
  TransactionService: require("./TransactionService")
});

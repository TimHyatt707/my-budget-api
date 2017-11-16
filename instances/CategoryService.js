const CategoryService = require("../services/CategoryService");

module.exports = new CategoryService({
  CategoryRepository: require("./categoryRepository"),
  UserRepository: require("./userRepository")
});

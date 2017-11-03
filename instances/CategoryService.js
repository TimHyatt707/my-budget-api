const CategoryService = require("../services/CategoryService");

module.exports = new CategoryService({
  CategoryRepository: require("./CategoryRepository"),
  UserRepository: require("./UserRepository")
});

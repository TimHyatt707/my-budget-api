const CategoryRepository = require("../repositories/CategoryRepository");

module.exports = new CategoryRepository({
  db: require("./defaultDatabase")
});

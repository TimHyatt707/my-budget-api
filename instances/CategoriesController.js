const CategoriesController = require("../controllers/CategoriesController");

module.exports = new CategoriesController({
  CategoryService: require("./CategoryService")
});

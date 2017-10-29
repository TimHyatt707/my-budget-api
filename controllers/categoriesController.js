const CategoryService = require("./../services/CategoryService");

class CategoriesController {
  async updateCategoryById(req, res, next) {
    try {
      const categoryId = parseInt(req.params.categoryid);
      const category = await CategoryService.getCategoryByID(categoryId);
      res.json(category);
    } catch (error) {
      next(error);
    }
  }
  async deleteCategoryById(req, res, next) {
    try {
      const categoryId = parseInt(req.params.categoryid);
      const category = await CategoryService.deleteCategoryById(categoryId);
      res.json(category);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = CategoriesController;

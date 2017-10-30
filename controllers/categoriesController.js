const CategoryService = require("./../services/CategoryService");
const categoryService = new CategoryService();

class CategoriesController {
  async updateCategoryById(req, res, next) {
    try {
      const categoryId = parseInt(req.params.categoryid);
      const category = await categoryService.getCategoryByID(categoryId);
      res.json(category);
    } catch (error) {
      next(error);
    }
  }
  async deleteCategoryById(req, res, next) {
    try {
      const categoryId = parseInt(req.params.categoryid);
      const category = await categoryService.deleteCategoryById(categoryId);
      res.json(category);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = CategoriesController;

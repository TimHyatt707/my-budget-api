const categoryService = require("./../services/categoryService");

class categoriesController {
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

module.exports = categoriesController;

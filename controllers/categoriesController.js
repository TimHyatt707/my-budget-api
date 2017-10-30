const CategoryService = require("./../services/CategoryService");
const categoryService = new CategoryService();

class CategoriesController {
  async updateCategoryById(req, res, next) {
    try {
      const categoryId = parseInt(req.params.categoryid);
      const attributes = req.body;
      const category = await categoryService.update(categoryId, attributes);
      res.json(category);
    } catch (error) {
      next(error);
    }
  }
  async deleteCategoryById(req, res, next) {
    try {
      const categoryId = parseInt(req.params.categoryid);
      const category = await categoryService.delete(categoryId);
      res.json(category);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = CategoriesController;

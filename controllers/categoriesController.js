const CategoryService = require("./../services/CategoryService");
const categoryService = new CategoryService();

class CategoriesController {
  async updateCategoryById(req, res, next) {
    try {
      const categoryId = parseInt(req.params.categoryid);
      const attributes = Object.assign({}, req.body);
      const token = Object.assign({}, req.body);
      delete attributes.token;
      const category = await categoryService.update(
        categoryId,
        attributes,
        token
      );
      if (
        category.message === "invalid signature" ||
        category.message === "jwt must be provided" ||
        category === "invalid signature"
      ) {
        res.status(401).json({ message: "Unauthorized" });
      } else res.json(category);
    } catch (error) {
      next(error);
    }
  }
  async deleteCategoryById(req, res, next) {
    try {
      const categoryId = parseInt(req.params.categoryid);
      const token = Object.assign({}, req.body);
      const category = await categoryService.delete(categoryId, token);
      if (
        category.message === "invalid signature" ||
        category.message === "jwt must be provided" ||
        category === "invalid signature"
      ) {
        res.status(401).json({ message: "Unauthorized" });
      } else res.json(category);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = CategoriesController;

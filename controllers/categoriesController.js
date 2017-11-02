class CategoriesController {
  constructor({ CategoryService }) {
    this._categoryService = CategoryService;
    this.updateCategoryById = this.updateCategoryById.bind(this);
    this.deleteCategoryById = this.deleteCategoryById.bind(this);
  }
  async updateCategoryById(req, res, next) {
    try {
      const categoryId = parseInt(req.params.categoryid);
      const attributes = Object.assign({}, req.body);
      const token = req.get("Authorization");
      const category = await this._categoryService.update(
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
      const token = req.get("Authorization");
      const category = await this._categoryService.delete(categoryId, token);
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

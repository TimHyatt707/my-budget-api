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
      res.json(category);
    } catch (error) {
      if (error === "Forbidden") {
        res.status(403);
      } else {
        res.status(400);
      }
    }
  }
  async deleteCategoryById(req, res, next) {
    try {
      const categoryId = parseInt(req.params.categoryid);
      const token = req.get("Authorization");
      const category = await this._categoryService.delete(categoryId, token);
      res.json(category);
    } catch (error) {
      if (error === "Forbidden") {
        res.status(403);
      } else res.status(400);
    }
  }
}

module.exports = CategoriesController;

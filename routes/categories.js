const express = require("express");
const Boom = require("Boom");
const router = express.Router();
const CategoriesController = require("./../controllers/CategoriesController");
const categoriesController = new CategoriesController();

router.patch(
  "/categories/:categoryid",
  categoriesController.updateCategoryById
);

router.delete(
  "/categories/:categoryid",
  categoriesController.deleteCategoryById
);

router.all("/categories", next => next(Boom.Method("Method not allowed")));

module.exports = router;

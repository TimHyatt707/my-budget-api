const express = require("express");
const Boom = require("boom");
const router = express.Router();
const categoriesController = require("../instances/CategoriesController");

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

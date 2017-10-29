const express = require("express");
const Boom = require("Boom");
const router = express.Router();
const categoriesController = require("./../controllers/categoriesController");

router.patch(
  "/categories/:categoryid",
  categoriesController.updateCategoryById
);

router.delete(
  "/categories/:categoryid",
  categoriesController.deleteCategoryById
);

router.all("*", next => next(Boom.Method("Method not allowed")));

module.exports = router;

const express = require("express");
const Boom = require("boom");
const router = express.Router();
const usersController = require("../instances/usersController");

router.get("/user", usersController.getUserById);
router.get(
  "/users/:userid(\\d+)/categories",
  usersController.getCategoriesByUser
);
router.get(
  "/users/:userid(\\d+)/transactions",
  usersController.getTransactionsByUser
);

router.post("/users", usersController.createUser);
router.post("/users/:userid(\\d+)/categories", usersController.createCategory);
router.post(
  "/users/:userid(\\d+)/transactions",
  usersController.createTransaction
);

router.patch("/users/:userid(\\d+)/", usersController.updateUser);

router.delete("/users/:userid(\\d+)/", usersController.deleteUser);

router.all("/users", next => {
  next(Boom.Method("That method is not allowed"));
});

module.exports = router;

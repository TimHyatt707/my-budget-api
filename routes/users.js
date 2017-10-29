const express = require("express");
const Boom = require("Boom");
const router = express.Router();
const usersController = require("./../controllers/usersController");

router.get("/users/:userid(\\d+)/", usersController.getUserById);
router.get("/users/:userid(\\d+)/", usersController.getTransactionsByUser);
router.get("/users/:userd(\\d+)/", usersController.getCategoriesByUser);

router.post("/users", usersController.createUser);
router.post("/users/:userid(\\d+)/categories", usersController.createCategory);
router.post(
  "/users/:userid(\\d+)/transactions",
  usersController.createTransaction
);
router.post("/users/login", usersController.loginUser);

router.patch("/users/:userid(\\d+)/", usersController.updateUser);

router.delete("/users/:userid(\\d+)/", usersController.deleteUser);

router.all("*", next => {
  next(Boom.Method("That method is not allowed"));
});

module.exports = router;

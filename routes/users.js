const express = require("express");
const Boom = require("Boom");
const router = express.Router();
const usersController = require("./../controllers/usersController");

router.get("/users/:userid", usersController.getUserById);
router.get("/users/:userid", usersController.getTransactionsByUser);
router.get("/users/:userd", usersController.getCategoriesByUser);

router.post("/users", usersController.createUser);
router.post("/users/:userid/categories", usersController.createCategory);
router.post("/users/:userid/transactions");

router.post("/users/login", usersController.loginUser);

// router.all("*", (next) => {
//   next(Boom.Meth)
// })

module.exports = router;

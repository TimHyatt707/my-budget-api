const express = require("express");
const Boom = require("Boom");
const router = express.Router();
const transactionsController = require("./../controllers/transactionsController");

router.patch(
  "/transactions/:transactionid",
  transactionsController.updateTransactionById
);

router.delete(
  "/transactions/:transactionid",
  transactionsController.deleteTransactionById
);

router.all("*", next => next(Boom.Method("Method not allowed")));

module.exports = router;

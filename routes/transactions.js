const express = require("express");
const Boom = require("Boom");
const router = express.Router();
const TransactionsController = require("./../controllers/TransactionsController");
const transactionsController = new TransactionsController();

router.patch(
  "/transactions/:transactionid",
  transactionsController.updateTransactionById
);

router.delete(
  "/transactions/:transactionid",
  transactionsController.deleteTransactionById
);

router.all("/transactions", next => next(Boom.Method("Method not allowed")));

module.exports = router;

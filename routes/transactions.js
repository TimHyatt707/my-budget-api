const express = require("express");
const Boom = require("boom");
const router = express.Router();
const transactionsController = require("../instances/transactionsController");

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

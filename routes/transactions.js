const express = require("express");
const Boom = require("Boom");
const router = express.Router();

router.post("/transactions", (req, res) => {
  res.json("Success");
});

module.exports = router;

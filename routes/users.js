const express = require("express");
const Boom = require("Boom");
const router = express.Router();

router.get("/users/:userid", (req, res));

router.post("/users", (req, res) => {
  res.json("Success");
});

router.post("/users/login", (req, res) => {
  res.json("Sucess");
});

module.exports = router;

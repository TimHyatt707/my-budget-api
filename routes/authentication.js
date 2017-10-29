const express = require("express");
const Boom = require("boom");
const router = express.Router();
const authenticationController = require("./../controllers/authenticationController");

router.post("/login", authenticationController.authenticate);

router.all("*", next => next(Boom.Method("Method not allowed")));

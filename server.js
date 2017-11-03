const express = require("express");
const bodyParser = require("body-parser");
const PORT = parseInt(process.env.PORT) || 8000;
const usersRouter = require("./routes/users");
const cors = require("cors");
const categoriesRouter = require("./routes/categories");
const transactionsRouter = require("./routes/transactions");
const authenticationRouter = require("./routes/authentication");

const server = express();
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(cors());

server.use(authenticationRouter);
server.use(usersRouter);
server.use(categoriesRouter);
server.use(transactionsRouter);

server.all("*", (req, res) => {
  res.sendStatus(404);
});

if (!module.parent) {
  server.listen(PORT, () => {
    console.log(`Listening on Port:${PORT}`); // eslint-disable-line no-console
  });
}

module.exports = server;

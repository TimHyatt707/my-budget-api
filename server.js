const express = require("express");
const bodyParser = require("body-parser");
// const cors = require("cors"); //Implement this later
const jwt = require("express-jwt");
const PORT = parseInt(process.env.PORT) || 8000;
const usersRouter = require("./routes/users");
const categoriesRouter = require("./routes/categories");
const transactionsRouter = require("./routes/transactions");
const authenticationRouter = require("./routes/authentication");

const server = express();
server.use(bodyParser.json());

server.use(authenticationRouter);
server.use(usersRouter);
server.use(categoriesRouter);
server.use(transactionsRouter);

server.all("*", (req, res) => {
  res.sendStatus(404);
});

//TO DO: JWT KEY

server.listen(PORT, () => {
  console.log(`Listening on Port:${PORT}`); // eslint-disable-line no-console
});

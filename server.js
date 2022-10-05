const express = require("express");
const server = express();
const PORT = 3000;

const apiRouter = require("./api");
server.use("/api", apiRouter);

const { client } = require("./db");
client.connect();

server.listen(PORT, () => {
  console.log("The server is up on port:", PORT);
});

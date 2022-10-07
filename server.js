const express = require("express");
const server = express();
const PORT = 3000;

const apiRouter = require("./backend/api");
server.use("/api", apiRouter);

// const { client } = require("./backend/db");
// client.connect();

server.listen(PORT, () => {
  console.log("The server is up on port:", PORT);
});

const express = require("express");
const server = express();
const PORT = 3001;

const apiRouter = require("./backend/api");
server.use("/api", apiRouter);

// const { client } = require("./backend/db");
// client.connect();

server.listen(PORT, () => {
  console.log("The server is up on port:", PORT);
});


// //new edits by fred (testing)
// const http = require("http");
// const app = require('./app');

// const PORT = 3001;
// const server = http.createServer(app)

// server.listen(PORT, () => {
//   console.log("The server is up on port:", PORT);
// });

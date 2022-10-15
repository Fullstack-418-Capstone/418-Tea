const express = require("express");
const server = express();
const {PORT = 3001} = process.env;

require("dotenv").config();
const cors = require('cors');
server.use(express.json())

server.use(cors());

const apiRouter = require("./backend/api");
server.use("/api", apiRouter);

const  client  = require("./backend/database/client.js");
client.connect();

server.listen(PORT, () => {
  console.log("The server is up on port:", PORT);
});

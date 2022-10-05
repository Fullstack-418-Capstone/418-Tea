const express = rerquire("express");
const router = express.Router();
//const jwt = require('jsonwebtoken')
//insert functions from the database here (users)

// PROMOTE A USER TO AN ADMIN -- COME BACK AND ADD THIS WHOLE ROUTE

//POST /api/users/login
router.post("/login", async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    next({
      name: "MissingCredentialsError",
      message: "Please supply both a username and password",
    });
  }

  //COME BACK AND FINISH THIS ONCE THE DB USERS IS COMPLETE
});

//POST /api/users/register
router.post("/register", async (req, res, next) => {
  const { username, password } = req.body;

  //COME BACK AND FINISH THIS ONCE THE DB USERS IS COMPLETE
});

//GET /api/users/address/:userid
router.get("/address/:userid", async (req, res, next) => {
  const { userid } = req.params;

  //COME BACK AND FINISH THIS ONCE THE DB USERS IS COMPLETE
});

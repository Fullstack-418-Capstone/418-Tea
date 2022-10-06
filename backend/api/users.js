const express = require("express");
const router = express.Router();
const {
  getUserById,
  getUserByUsername,
  createUser,
} = require("../database/users");
const { getAddressByUserId } = require("../database/addresses");
const jwt = require("jsonwebtoken");

//POST /api/users/login
router.post("/login", async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    next({
      name: "MissingCredentialsError",
      message: "Please supply both a username and password",
    });
  }

  try {
    const user = await getUserByUsername(username);

    if (user && user.password == password) {
      const token = jwt.sign(
        { id: user.id, username: user.username },
        process.env.JWT_SECRET
      );
      res.send({ message: "Youre logged in!", token: `${token}` });
    } else {
      next({
        name: "IncorrectCredentialError",
        message: "Username or password is incorrect",
      });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

//POST /api/users/register
router.post("/register", async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const member = await getUserByUsername(username);

    if (member) {
      res.send({ message: "A user with that username already exists" });

      next({
        name: "UserExistsError",
        message: "A user with that username alread exists",
      });
    }
    const user = await createUser({ username, password });

    const token = jwt.sign({ id: user.id, username }, process.env.JWT_SECRET);

    res.send({
      message: "Thank you for signing up!",
      token,
      user,
    });
  } catch ({ name, message }) {
    next({ name, message });
  }
});

//GET /api/users/address/:userid
router.get("/address/user", async (req, res, next) => {
  const user = await getUserByUsername(username);
  res.send(user);
});

// PROMOTE A USER TO AN ADMIN -- COME BACK AND ADD THIS WHOLE ROUTE -- FINISH ONCE NEEDED

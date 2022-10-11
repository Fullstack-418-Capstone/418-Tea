const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  getUserByUsername,
  createUser,
  updateUserInformationById,
} = require("../database/users");
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
      res.send({ message: "Youre logged in!", token: `${token}`, user });
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
  const {
    username,
    password,
    firstname,
    lastname,
    address1,
    email,
    city,
    state,
    zipcode,
  } = req.body;

  const address = { address1, city, state, zipcode };

  try {
    const member = await getUserByUsername(username);

    if (member) {
      res.send({ message: "A user with that username already exists" });

      next({
        name: "UserExistsError",
        message: "A user with that username alread exists",
      });
    }
    const user = await createUser({
      username,
      password,
      firstname,
      lastname,
      address,
      email,
    });

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

//GET /api/users/address/username
router.get("/address/:username", async (req, res, next) => {
  const { username } = req.params;

  try {
    const user = await getUserByUsername(username);
    res.send(user);
  } catch (error) {
    throw error;
  }
});

//GET /api/users/username
router.get("/:username", async (req, res, next) => {
  const { username } = req.params;

  try {
    const user = await getUserByUsername(username);
    res.send(user);
  } catch (error) {
    throw error;
  }
});

router.patch("/:userInformation", async (req, res, next) => {
  const { userInformation } = req.params;
  const { firstname, lastname, password, address, state, city, zipcode } =
    req.body;
    
  const { id } = req.user;
  console.log('id from token is', id)
  const updateFields = {};

  if (firstname) {
    updateFields.firstname = firstname;
  }

  if (lastname) {
    updateFields.lastname = lastname;
  }

  if (password) {
    updateFields.password = password;
  }

  if (address) {
    updateFields.address = address;
  }

  if (state) {
    updateFields.state = state;
  }

  if (city) {
    updateFields.city = city;
  }

  if (zipcode) {
    updateFields.zipcode = zipcode;
  }

  try {
    const updateInfo = await updateUserInformationById({id, firstname, lastname, password});

    res.send(updateInfo);
  } catch (error) {
    throw error;
  }
});

//GET /api/users
router.get("/", async (req, res, next) => {
  try {
    const users = await getAllUsers();
    res.send(users);
  } catch (err) {
    throw err;
  }
});

// PROMOTE A USER TO AN ADMIN -- COME BACK AND ADD THIS WHOLE ROUTE -- FINISH ONCE NEEDED
module.exports = router;

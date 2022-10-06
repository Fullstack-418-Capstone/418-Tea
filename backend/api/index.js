const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;
const { getUserByUserId } = require("../database/users");

router.use(async (req, res, next) => {
  const prefix = "Bearer ";
  const auth = req.header("Authorization");

  if (!auth) {
    next();
  } else if (auth.startsWith(prefix)) {
    const token = auth.slice(prefix.length);

    try {
      const { id } = jwt.verify(token, JWT_SECRET);

      if (id) {
        req.user = await getUserByUserId(id);
        next();
      }
    } catch ({ name, message }) {
      next({ name, message });
    }
  } else {
    next({
      name: "AuthorizationHeaderError",
      message: `Authorization must start with ${prefix}`,
    });
  }
});

// ROUTER: /api/addresses
const addressesRouter = require("./addresses");
router.use("/addresses", addressesRouter);

// ROUTER: /api/ordersProducts
const ordersProducts = require("./orders_products");
router.use("/orders_products", ordersProducts);

// ROUTER: /api/orders
const orders = require("./orders");
router.use("/orders", orders);

// ROUTER: /api/products
const products = require("./products");
router.use("/products", products);

// ROUTER: /api/users
const users = require("./users");
const { getUserByUserId } = require("../database/users");
router.use("/users", users);

module.exports = router;

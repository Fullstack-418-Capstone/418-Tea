const express = require("express");
const router = express.Router();
//const jwt = require("jsonwebtoken");
//const { JWT_SECRET } = process.env;

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
router.use("/users", users);

module.exports = router;

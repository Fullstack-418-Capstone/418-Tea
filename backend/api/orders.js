const express = require("express");
const router = express.Router();
const {
  getAllOrders,
  getOpenOrders,
  getOrdersbyUserId,
  getOpenCartByUser,
} = require("../database/orders");
//const jwt = require('jsonwebtoken')

//GET all orders
router.get("/", async (req, res, next) => {
  const orders = await getAllOrders();

  res.send(orders);
});

//Get all open orders
router.get("/openorders", async (req, res, next) => {
  const openOrders = await getOpenOrders();

  res.send(openOrders);
});

//GET cart by user id
router.get("/cart/userid", async (req, res, next) => {
  const userCart = await getOpenCartByUser(userId);

  res.send(userCart);
});

//GET orders by user id
router.get("/order/userid", async (req, res, next) => {
  const orderByUser = await getOrdersbyUserId(userId);

  res.send(orderByUser);
});

//PATCH edit orders -- decided we did not need this

//DELETE delete order -- decided we did not need this either

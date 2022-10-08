const express = require("express");
const router = express.Router();
const {
  getAllOrders,
  getOpenOrders,
  getOrdersbyUserId,
  getOpenCartByUser,
} = require("../database/orders");

//GET all orders
router.get("/", async (req, res, next) => {
  try {
    const orders = await getAllOrders();

    res.send(orders);
  } catch (error) {
    throw error;
  }
});

//Get all open orders
router.get("/openorders", async (req, res, next) => {
  try {
    const openOrders = await getOpenOrders();

    res.send(openOrders);
  } catch (error) {
    throw error;
  }
});

//GET CART by user id
router.get("/cart/:userid", async (req, res, next) => {
  const { userId } = req.params;
  try {
    const userCart = await getOpenCartByUser(userId);

    res.send(userCart);
  } catch (error) {
    throw error;
  }
});

//GET ORDERS by user id
router.get("/order/:userid", async (req, res, next) => {
  const { userId } = req.params;
  try {
    const orderByUser = await getOrdersbyUserId(userId);

    res.send(orderByUser);
  } catch (error) {
    throw error;
  }
});

//PATCH edit orders -- decided we did not need this

//DELETE delete order -- decided we did not need this either
module.exports = router;

const express = require("express");
const router = express.Router();
const {
  getAllOrders,
  getOpenOrders,
  getOrdersbyUserId,
  getOpenCartByUser,
  getOrdersByOrderId,
  placeOrder,
} = require("../database/orders");
const { createNewOrdersProduct } = require("../database/orders_products");
const { getCartProductsByOrderId } = require("../database/orders_products");

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
router.get("/order/:userId", async (req, res, next) => {
  console.log("REQPARAMSSSSS", req.params);
  const { id: userId } = req.user;
  console.log("USER IDDDDD", userId);
  try {
    const ordersToReturn = [];
    const orderByUser = await getOrdersbyUserId(userId);
    for (let i = 0; i < orderByUser.length; i++) {
      const thisOrder = await getOrdersByOrderId(orderByUser[i].id);
      console.log("ORDERRRRR", thisOrder);
      if (!thisOrder.isOpen) {
        const items = await getCartProductsByOrderId(thisOrder.id);
        ordersToReturn.push(items);
      }
    }

    res.send(ordersToReturn);
  } catch (error) {
    throw error;
  }
});

//PATCH edit orders -- decided we did not need this
router.patch("/placeorder/:userId", async (req, res, next) => {
  const { userId } = req.params;
  const { cartItems } = req.body;
  try {
    if (!req.user) {
      for (const item of cartItems) {
        await createNewOrdersProduct({
          userId,
          productId: item.id,
          quantity: item.quantity,
          price: item.price,
        });
      }
    }
    const orderId = await getOpenCartByUser(userId);
    const orderPlaced = await placeOrder(orderId);
    console.log(orderPlaced);

    return orderPlaced;
  } catch ({ name, message }) {
    next({ name, message });
  }
});

//DELETE delete order -- decided we did not need this either
module.exports = router;

const express = require("express");
const router = express.Router();
const {
  createNewOrdersProduct,
  getOpenCartByUserName,
  getOpenCartProductsByOrderId,
  editNewOrdersProductQuantity,
  deleteOrdersProduct,
} = require("../database/orders_products");

const { getUserByUsername } = require("../database/users");
//GET /api/order_products/:username
router.get("/order_products/username", async (req, res, next) => {
  try {
    const orderByUsername = await getOpenCartByUserName(username);

    res.send(orderByUsername);
  } catch (error) {
    throw error;
  }
});

//GET /api/order_products/:orderId
router.get("/order_products/orderId", async (req, res, next) => {
  try {
    const productByProductId = await getOpenCartProductsByOrderId(orderId);

    res.send(productByProductId);
  } catch (error) {
    throw error;
  }
});

// POST /api/addtocart
router.post("/addtocart", async (req, res, next) => {
  const { userId, productId, quantity, price } = req.body;

  const member = await getUserByUsername(username);

  try {
    if (member) {
      addToCartMember = createNewOrdersProduct(
        userId,
        productId,
        quantity,
        price
      );

      res.send(addToCartMember);
    } else {
      addToCartNonMember = await createNewOrdersProduct(
        productId,
        quantity,
        price
      );

      res.send(addToCartNonMember);
    }
  } catch (error) {
    throw error;
  }
});

//patch request to edit the quantity
router.patch("/editquantity", async (req, res, next) => {
  const { userId, productId, quantity } = req.params;

  const member = getUserByUsername(username);

  if (member) {
    editNewOrdersProductQuantity(userId, productId, quantity);
  } else {
    editNewOrdersProductQuantity(productId, quantity);
  }
});

// delete request
router.delete("/delete", async (req, res, next) => {
  const { userId, productId } = req.params;

  const member = getUserByUsername(username);

  if (member) {
    deleteOrdersProduct(userId, productId);
  } else {
    deleteOrdersProduct(productId);
  }
});

const express = require("express");
const router = express.Router();
const {
  createNewOrdersProduct,
  getOpenCartProductsByUserName,
  getOpenCartProductsByOrderId,
  editNewOrdersProductQuantity,
  deleteOrdersProduct,
} = require("../database/orders_products");

//GET /api/order_products/:username
router.get("/:username", async (req, res, next) => {
  const { username } = req.params;
  try {
    const orderByUsername = await getOpenCartProductsByUserName(username);

    res.send(orderByUsername);
  } catch (error) {
    throw error;
  }
});

//GET /api/order_products/:orderId
router.get("/:orderId", async (req, res, next) => {
  const { orderId } = req.params;
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

  try {
    addToCartMember = createNewOrdersProduct(
      userId,
      productId,
      quantity,
      price
    );

    res.send(addToCartMember);
  } catch (error) {
    throw error;
  }
});

//patch request to edit the quantity
router.patch("/editquantity", async (req, res, next) => {
  const { userId, productId, quantity } = req.body;

  const editCart = editNewOrdersProductQuantity(userId, productId, quantity);

  res.send(editCart);
});

// delete request
router.delete("/delete", async (req, res, next) => {
  const { id: userId } = req.user
  const { productId } = req.body;

  const deleteFromCart = deleteOrdersProduct({userId, productId});

  res.send(deleteFromCart);
});

module.exports = router;

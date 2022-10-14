const express = require("express");
const router = express.Router();
const {
  createNewOrdersProduct,
  getOpenCartProductsByUserName,
  getOpenCartProductsByUserId,
  getCartProductsByOrderId,
  editNewOrdersProductQuantity,
  deleteOrdersProduct,
} = require("../database/orders_products");

//GET /api/order_products/:username
// router.get("/:username", async (req, res, next) => {
//   console.log('this is running and username is')
//   const { username } = req.params;
//   console.log(username)
//   try {
//     const orderByUsername = await getOpenCartProductsByUserName(username);

//     res.send(orderByUsername);
//   } catch (error) {
//     throw error;
//   }
// });

router.get("/user", async (req, res, next) => {
  const {id: userId} = req.user;
  try {
    const orderByUserId = await getOpenCartProductsByUserId(userId);

    res.send(orderByUserId);
  } catch (error) {
    throw error;
  }
});

//GET /api/order_products/:orderId
router.get("/orders/:orderId", async (req, res, next) => {
  const { orderId } = req.params;
  try {
    const productsByOrderId = await getCartProductsByOrderId(orderId);

    res.send(productsByOrderId);
  } catch (error) {
    throw error;
  }
});

// POST /api/addtocart
router.post("/addtocart", async (req, res, next) => {
  const { productId, quantity, price } = req.body;
  const {id: userId} = req.user;

  try {
    const addToCartMember = await createNewOrdersProduct({
      userId,
      productId,
      quantity,
      price
    });

    res.send(addToCartMember);
  } catch (error) {
    throw error;
  }
});

//patch request to edit the quantity
router.patch("/editquantity", async (req, res, next) => {
  const { productId, quantity } = req.body;
  const {id : userId} =req.user;

  const editCart = await editNewOrdersProductQuantity({userId, productId, quantity});
  res.send(editCart);
});

// delete request
router.delete("/delete", async (req, res, next) => {
  const { id: userId } = req.user
  const { productId } = req.body;

  const deleteFromCart = await deleteOrdersProduct({userId, productId});

  res.send(deleteFromCart);
});

router.get("/:username", async (req, res, next) => {
  const { username } = req.params;
  try {
    const orderByUsername = await getOpenCartProductsByUserName(username);

    res.send(orderByUsername);
  } catch (error) {
    throw error;
  }
});

module.exports = router;

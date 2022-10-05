const express = require("express");
const router = express.Router();
//const jwt = require('jsonwebtoken')
//insert functions from the database here (products)

// GET /api/products  --> get all products
router.get("/", async (req, res, next) => {
  //const products = await getAllProducts();
  //res.send(products)
});

//DELETE /api/products/:productid
router.delete("/:productId", async (req, res, next) => {
  //const { productId } = req.params;
});

//UPDATE // PATCH /api/products/:productid
router.patch("/:productId", async (req, res, next) => {
  //const { productId } = req.params;
});

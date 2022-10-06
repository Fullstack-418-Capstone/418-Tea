const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  deleteProduct,
  getProductById,
  editProduct,
} = require("../database/products");

// GET /api/products  --> get all products
router.get("/", async (req, res, next) => {
  const products = await getAllProducts();
  res.send(products);
});

//DELETE /api/products/:productid
router.delete("/:productId", async (req, res, next) => {
  const { productId } = req.params;
  const { isAdmin } = req.user;

  try {
    const product = await getProductById(productId);

    if (product && isAdmin) {
      deleteProduct(productId);
    } else {
      next(
        product
          ? {
              name: "UnauthorizedUserError",
              message: "You do not have admin authority",
            }
          : {
              name: "ProductNotFoundError",
              message: "That product does not exist",
            }
      );
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});

//UPDATE // PATCH /api/products/:productid
router.patch("/:productId", async (req, res, next) => {
  const { productId } = req.params;
  const { isadmin } = req.user;
  const { name, imgurl, description, stock, price, unit, type } = req.body;

  const updateFields = {};

  if (name) {
    updateFields.name = name;
  }

  if (imgurl) {
    updateFields.imgurl = imgurl;
  }

  if (description) {
    updateFields.description = description;
  }

  if (stock) {
    updateFields.stock = stock;
  }

  if (price) {
    updateFields.price = price;
  }

  if (unit) {
    updateFields.unit = unit;
  }

  if (type) {
    updateFields.type = type;
  }

  updateFields.id = productId;

  try {
    if (isadmin) {
      const edit = await editProduct(updateFields);
      res.send({ product: edit });
    } else {
      next({
        name: "UnauthorizedUserError",
        message: "You cannot update a product if you are not an admin",
      });
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});

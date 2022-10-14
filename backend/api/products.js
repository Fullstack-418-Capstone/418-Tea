const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  deleteProduct,
  getProductById,
  getAllActiveProducts,
  editProductById,
  createProduct,
} = require("../database/products");

// GET /api/products  --> get all products

router.post("/add", async (req, res, next) => {
  const { name, imgurl, description, stock, price, unit, type, isActive } =
    req.body;

  try {
    newProduct = await createProduct({
      name,
      imgurl,
      description,
      stock,
      price,
      unit,
      type,
      isActive,
    });
  } catch (error) {
    throw error;
  }
});

router.get("/", async (req, res, next) => {
  const products = await getAllProducts();
  res.send(products);
});

router.get("/active", async (req, res, next) => {
  const products = await getAllActiveProducts();
  res.send(products);
});

router.get("/:productId", async (req, res, next) => {
  const { productId } = req.params;

  try {
    const product = await getProductById(productId);

    if (product) {
      res.send(product);
    } else {
      next({
        name: "ProductNotFoundError",
        message: "That product does not exist",
      });
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
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
  const { isAdmin } = req.user;
  const { name, imgurl, description, stock, price, unit, type, isActive } =
    req.body;

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
  updateFields.isActive = isActive;

  updateFields.id = productId;

  try {
    if (isAdmin) {
      const edit = await editProductById(updateFields);
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

module.exports = router;

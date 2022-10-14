import React, { useState, useEffect } from "react";
import { removeFromCart, getCartByUsername, editCartQuantity } from "../api";
import "./cart.css";

const CartItem = ({
  product,
  index,
  setCartItems,
  token,
  user,
  setTrigger,
  trigger,
}) => {
  product.imgurl ? null : (product.imgurl = "tealeaf/blacktea.jpg");
  const [quantity, setQuantity] = useState(1);

  const removeFromCartButton = async (index, productId) => {
    if (!token) {
      const currentCart = JSON.parse(
        localStorage.getItem("418WhatsTeaGuestCart")
      );
      currentCart.splice(index, 1);
      localStorage.setItem("418WhatsTeaGuestCart", JSON.stringify(currentCart));
      setCartItems(currentCart);
      setTrigger(!trigger);
    } else {
      const removedItem = await removeFromCart(user.id, productId, token);
      const userCart = await getCartByUsername(user.username);
      if (userCart) {
        setCartItems(userCart);
        setTrigger(!trigger);
      }
    }
  };

  const quantityHandler = async (quantity, productId) => {
    if (token) {
      try {
        const editedItem = await editCartQuantity(
          user.id,
          productId,
          quantity,
          token
        );
        return editedItem;
      } catch (error) {
        throw error;
      }
    } else {
      const currentCart = JSON.parse(
        localStorage.getItem("418WhatsTeaGuestCart")
      );
      currentCart[index].quantity = quantity;
      localStorage.setItem("418WhatsTeaGuestCart", JSON.stringify(currentCart));
    }
  };

  useEffect(() => {
    setQuantity(product.quantity);
  }, []);

  return (
    <div className="productWindow">
      <img
        src={require(`../assets/${product.imgurl}`)}
        style={{ height: "115px", width: "115px" }}
      />
      <>{product.name}</>
      <br />
      <>{product.description}</>
      <br />
      <>
        ${product.price} / {product.unit}
      </>
      <br />
      <>Total: ${product.price * quantity}</>
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          await quantityHandler(quantity, product.id);
        }}
      >
        <h6 style={{ margin: 0 }}>
          *Must submit for changes to apply when placing order
        </h6>
        <label>Quantity: {quantity}</label>
        <br />
        <input
          type="number"
          value={quantity}
          onChange={(event) => {
            if (event.target.value <= 0) {
              setQuantity(1);
            } else if (event.target.value > product.stock) {
              setQuantity(product.stock);
            } else {
              setQuantity(event.target.value);
            }
          }}
        />
        <button className="submit" type="submit">
          Submit
        </button>
      </form>
      <button
        className="remove"
        onClick={() => removeFromCartButton(index, product.id)}
      >
        Remove from Cart
      </button>
    </div>
  );
};
export default CartItem;

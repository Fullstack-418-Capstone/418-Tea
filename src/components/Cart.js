import React, { useEffect, useState } from "react";
import CartItem from "./CartItem";
import { getCartByUsername, getProductById, placeOrder } from "../api";
import "./cart.css";

const Cart = ({ token, user }) => {
  const [cartItems, setCartItems] = useState([]);
  const [trigger, setTrigger] = useState(false);

  const getCartForUser = async (username) => {
    const userCart = await getCartByUsername(username);
    if (userCart) {
      const productList = [];
      for (const item of userCart) {
        const productInfo = await getProductById(item.productId);
        productInfo.quantity = item.quantity;
        productList.push(productInfo);
      }
      setCartItems(productList);
    }
  };

  const getCartFromLocal = () => {
    const guestCart = JSON.parse(localStorage.getItem("418WhatsTeaGuestCart"));
    if (guestCart) {
      for (const item of guestCart) {
        !item.quantity ? (item.quantity = 1) : null;
      }
      setCartItems(guestCart);
    }
  };

  const getTotal = () => {
    let total = 0;
    for (const item of cartItems) {
      let itemTotal = item.price * item.quantity;
      total += itemTotal;
    }
    return total;
  };

  useEffect(() => {
    token ? getCartForUser(user.username) : getCartFromLocal();
  }, [trigger]);

  const handlePlaceOrder = async (event) => {
    event.preventDefault();
    if (token) {
      const submittedOrder = await placeOrder(cartItems, token, user.id);
      if (submittedOrder) {
        setTrigger(!trigger);
        alert("Thank you for your purchase.");
        return submittedOrder;
      }
    } else {
      const submittedOrder = await placeOrder(cartItems);
      if (submittedOrder) {
        localStorage.removeItem("418WhatsTeaGuestCart");
        setTrigger(!trigger);
        setCartItems([]);
        alert("Thank you for your purchase.");
        return submittedOrder;
      }
    }
    alert("There was an issue placing your order");
  };

  return (
    <div>
      <h3>Total: ${getTotal()}</h3>
      <h5>
        *Total updates on refresh/leaving and returning after submitting
        quantity changes.
      </h5>
      <button
        className="place-order"
        onClick={(event) => {
          handlePlaceOrder(event);
        }}
      >
        Place Order
      </button>
      <hr />
      {cartItems.length > 0 ? (
        cartItems.map((product, index) => {
          return (
            <CartItem
              product={product}
              key={index}
              index={index}
              setCartItems={setCartItems}
              token={token}
              user={user}
              setTrigger={setTrigger}
              trigger={trigger}
            ></CartItem>
          );
        })
      ) : (
        <p>No items in cart</p>
      )}
      <hr />
    </div>
  );
};
export default Cart;

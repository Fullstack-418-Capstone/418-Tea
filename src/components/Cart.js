import React, { useEffect, useState } from "react";
import CartItem from "./CartItem";
import { getOpenCart, getProductById, placeOrder } from "../api";
import "./cart.css";

const Cart = ({token}) => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [trigger, setTrigger] = useState(false);

  useEffect(() => {
     token ? getCartForUser() : getCartFromLocal();
  }, [token, trigger]);

  const compareId = (a, b) => {
    if (a.productId < b.productId) {
      return -1;
    } else if (a.productId > b.productId) {
      return 1;
    } else {
      return 0;
    }
  };

  const getCartForUser = async () => {
    const userCart = await getOpenCart(token);
    userCart.sort(compareId);
    getTotal(userCart);
    setCartItems([]);
    setCartItems(userCart);
  }

  const getCartFromLocal = async() => {
    const guestCart = JSON.parse(localStorage.getItem("418WhatsTeaGuestCart"));
    if (guestCart) {
      getTotal(guestCart)
      setCartItems(guestCart)
    }
  };

  const getTotal = async(array) => {
    let cartTotal = 0;
    for (const item of array) {
      const {price} = await getProductById(item.productId)
      let itemTotal = price * item.quantity;
      cartTotal += itemTotal;
    }
    setTotal(cartTotal);
  };

  const handlePlaceOrder = async (event) => {
    event.preventDefault();
    if (token) {
      const submittedOrder = await placeOrder(cartItems, token);
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
      <h3>Total: ${total}</h3>
      
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
        cartItems.map((item, index) => {
          return (
            <CartItem
              item={item}
              key={item.productId}
              index={index}
              token={token}
              setTrigger={setTrigger}
              trigger={trigger}
            ></CartItem>
          );
        })
      ) : (
        <p>No items in cart</p>
      )}
    </div>
  );
};
export default Cart;

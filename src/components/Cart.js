import React, { useEffect, useState } from "react";
import CartItem from "./CartItem";
import { getCartByUsername, getOpenCart, getProductById, placeOrder } from "../api";
import "./cart.css";

const Cart = ({ token, user }) => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [trigger, setTrigger] = useState(false);


  // const getCartForUser = async (username) => {
  //   const userCart = await getCartByUsername(username);
  //   console.log('user cart is', userCart)
  //   if (userCart) {
  //     const productList = [];
  //     for (const item of userCart) {
  //       const productInfo = await getProductById(item.productId);
  //       productInfo.quantity = item.quantity;
  //       productList.push(productInfo);
  //     }
  //     console.log('setting cart to', productList)
  //     setCartItems(productList);
  //   }
  // };
  const compareName = (a, b) => {
    if (a.name < b.name) {
      return -1;
    } else if (a.name > b.name) {
      return 1;
    } else {
      return 0;
    }
  };

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
    userCart.sort(compareId)
    setCartItems(userCart)
    getTotal(userCart)
  }

  const getCartFromLocal = async() => {
    const guestCart = JSON.parse(localStorage.getItem("418WhatsTeaGuestCart"));
    // console.log('guestCart is', guestCart)
    if (guestCart) {
      const cartBuild = []
      for (const item of guestCart) {
        const cartItem = await getProductById(item.id)
        //  console.log('item is', item)
        //  console.log('api call is', cartItem)
        !item.quantity ? (cartItem.quantity = 1) :(cartItem.quantity = item.quantity);
        // cartItem.price = apiProduct.price
        cartItem.productId = item.id
        cartBuild.push(cartItem)
      }
      // console.log(guestCart)
      // console.log('cartbuild', cartBuild)
      // cartBuild.sort(compareId)
      getTotal(cartBuild)
      setCartItems(cartBuild)
    }
  };

  const getTotal = (array) => {
    let cartTotal = 0;
    for (const item of array) {
      let itemTotal = item.price * item.quantity;
      cartTotal += itemTotal;
    }
    setTotal(cartTotal);
  };
  // useEffect(() => {
  //   getTotal(cartItems);
  // },[cartItems])

  useEffect(() => {
    token ? getCartForUser() : getCartFromLocal();
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
              setCartItems={setCartItems}
              token={token}
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

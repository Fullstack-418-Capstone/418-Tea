import React, { useEffect, useState } from "react";
import { addToCart, editCartQuantity, getOpenCart } from "../api";
import "./productwindow.css";

const ProductWindow = ({ product, token }) => {
  product.imgurl ? null : (product.imgurl = "tealogo150.png");
  const [inCart, setInCart] = useState(false);
  const [cartItem, setCartItem] = useState([]);
  const [quantity, setQuantity] = useState(0);

  const addItem = async () => {
    if (token) {
      const cartList = await addToCart(product.id, 1, product.price, token);
      // return cartList;
    } else {
      const cartList = [{id:product.id}];
      const currentCart = JSON.parse(
        localStorage.getItem("418WhatsTeaGuestCart")
      );
      if (currentCart) {
        cartList.push(...currentCart);
      }
      localStorage.setItem("418WhatsTeaGuestCart", JSON.stringify(cartList));
    }
    setQuantity(quantity+1)
    setInCart(true)
  };
  const increaseQuantity = async() => {
    if (token){
      await editCartQuantity(token, product.id, quantity+1)
      setQuantity(quantity+1)
      return
    } else{
      //fetch from local cart
      const guestCart = JSON.parse(localStorage.getItem("418WhatsTeaGuestCart"))
      for(let i = 0; i< guestCart.length; i++){
        if(guestCart[i].id === product.id){
          guestCart[i].quantity = quantity+1;
          setQuantity(quantity+1)
          localStorage.setItem("418WhatsTeaGuestCart", JSON.stringify(guestCart));
          return
        }
      }
    }
  }


  const getCart = async() => {
    if(token){
      const usercart = await getOpenCart(token);
      for(let i = 0; i< usercart.length; i++){
        if(usercart[i].productId === product.id){
          setQuantity(usercart[i].quantity)
          setInCart(true)
          return
        }
      }
    } else{
      //fetch from local cart
      const guestCart = JSON.parse(localStorage.getItem("418WhatsTeaGuestCart"))
      for(let i = 0; i< guestCart.length; i++){
        if(guestCart[i].id === product.id){
          setQuantity(guestCart[i].quantity)
          setInCart(true)
          return
        }
      }
    }
  }

  useEffect(() => {
    getCart()
  },[token])

  return (
    <div className="productWindow">
      <div id="productTitle" className="productDiv">
        {product.name}
      </div>
      <img
        className="productDiv"
        src={require(`../assets/${product.imgurl}`)}
        style={{ height: "150px", width: "150px" }}
      />
      <div className="productDiv">{product.description}</div>
      {product.stock < 6 && product.stock > 0 ? (
        <div className="stockWarning">Only {product.stock} left in stock</div>
      ) : null}
      {product.stock === 0 ? (
        <div className="stockWarning">Out of Stock!</div>
      ) : null}
      <div className="priceBar">
        <div>
          ${product.price} /{product.unit}
        </div>
        { inCart ? (<button
          className="add"
          onClick={() => {
            increaseQuantity();
          }}
        >{quantity} In Cart</button>) :(
          <button
          className="add"
          onClick={() => {
            addItem();
          }}
        > Add to Cart
        </button>)}
      </div>
    </div>
  );
};
export default ProductWindow;

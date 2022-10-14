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
      const cartList = [product];
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
      await editCartQuantity(token, product.id, newQuantity())
    } else{
      //fetch from local cart
    }
    setQuantity(quantity+1)
  }

  const newQuantity = () => {
    return (quantity+1)
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
    }
  }

  useEffect(() => {
    getCart()
  },[token])

  return (
    <div className="productWindow">
      <button onClick={() =>{console.log(inCart)}}>Helper</button>
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
        >In Cart</button>) :(
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

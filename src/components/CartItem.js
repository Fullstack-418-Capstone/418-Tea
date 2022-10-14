import React, { useState, useEffect } from "react";
import { removeFromCart, getCartByUsername, editCartQuantity, getProductById, getOpenCart } from "../api";
import "./cart.css";

const CartItem = ({
  item,
  index,
  setCartItems,
  token,
  setTrigger,
  trigger
}) => {
  const [product, setProduct] = useState({imgurl:"tealeaf/blacktea.jpg"});
  const getProduct = async() => {
    const productfetch = await getProductById(item.productId);
    productfetch.imgurl ? null : (productfetch.imgurl = "tealeaf/blacktea.jpg");
    setProduct(productfetch)
  }
  useEffect(() => {
    getProduct()
  },[])
  const [quantity, setQuantity] = useState(item.quantity);

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
      // const removedItem = await removeFromCart(token, product.id);
      // const userCart = await getOpenCart(token);
      // if (userCart) {
      //   setCartItems(userCart);
      //   setTrigger(!trigger);
      // }
      await removeFromCart(token, product.id);
      setTrigger(!trigger)
    }
  };

  const quantityHandler = async () => {
    if (token){
      if(product.id && quantity !== undefined){
        try {
          const editedItem = await editCartQuantity(
            token,
            product.id,
            quantity
          );
          setTrigger(!trigger)
          return editedItem;
        } catch (error) {
          throw error;
        }

      }
    } else {
      const currentCart = JSON.parse(localStorage.getItem("418WhatsTeaGuestCart"));
      console.log(quantity)
      currentCart[index].quantity = quantity;
      localStorage.setItem("418WhatsTeaGuestCart", JSON.stringify(currentCart));
    }
  };
  useEffect(() => {
    if(quantity==='0'){
      removeFromCartButton(index, product.id)
    }else{quantityHandler(quantity, product.id)}
  },[quantity]);
  useEffect(() => {
    setQuantity(product.quantity);
  }, []);

  return (
    <div className="productWindow">
      <button onClick={()=>{console.log(product.name)}}>helper</button>
      <img
        src={require(`../assets/${product.imgurl}`)}
        style={{ height: "125px", width: "125px" }}
      />
      <>{product.name}</>
      <br />
      <>{product.description}</>
      <br />
      <>
        ${product.price} / {product.unit}
      </>
      <br />
      {/* <>Total: ${product.price * quantity}</> */}
      <form>
        <h6 style={{ margin: 0 }}>
        </h6>
        <label>Quantity: </label>
        <select value={quantity} onChange={(event) => setQuantity(event.target.value)}>Qty: {quantity}
          <option value='0'>0 (delete)</option>
          <hr/>
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
          <option>6</option>
          <option>7</option>
          <option>8</option>
          <option>9</option>
          <option>10+</option>
        </select>
        <br />
        {/* <input
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
        /> */}
        {/* <button className="submit" type="submit">
          Submit
        </button> */}
      </form>
      <br />
      <br />
      <div onClick={() => removeFromCartButton(index, product.id)}>Delete</div>
      {/* <button
        className="remove"
        onClick={() => removeFromCartButton(index, product.id)}
      >
        Remove from Cart
      </button> */}
    </div>
  );
};
export default CartItem;

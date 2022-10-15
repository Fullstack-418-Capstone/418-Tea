import React, { useState, useEffect } from "react";
import {removeFromCart, editCartQuantity, getProductById} from "../api";
import "./cart.css";

const CartItem = ({
  item,
  index,
  setCartItems,
  token,
  setTrigger,
  trigger,
}) => {
  const [product, setProduct] = useState({ imgurl: "tealeaf/blacktea.jpg" });
  const getProduct = async () => {
    const productfetch = await getProductById(item.id);
    productfetch.imgurl ? null : (productfetch.imgurl = "tealeaf/blacktea.jpg");
    setProduct(productfetch);
  };
  useEffect(() => {
    getProduct();
  }, []);
  const [quantity, setQuantity] = useState(item.quantity);

  const removeFromCartButton = async (index) => {
    if (!token) {
      const currentCart = JSON.parse(
        localStorage.getItem("418WhatsTeaGuestCart")
      );
      currentCart.splice(index, 1);
      localStorage.setItem("418WhatsTeaGuestCart", JSON.stringify(currentCart));
      setCartItems(currentCart);
      setTrigger(!trigger);
    } else {

      await removeFromCart(token, product.id);
      setTrigger(!trigger)
    }
  };

  const quantityHandler = async () => {
    if (token) {
      if (product.id && quantity !== undefined) {
        try {
          const editedItem = await editCartQuantity(
            token,
            product.id,
            quantity
          );
          return editedItem;
        } catch (error) {
          throw error;
        }
      }
    } else {
      const currentCart = JSON.parse(
        localStorage.getItem("418WhatsTeaGuestCart")
      );
      !quantity ? setQuantity(item.quantity) : null
      currentCart[index].quantity = parseInt(quantity);
      localStorage.setItem("418WhatsTeaGuestCart", JSON.stringify(currentCart));
    }
    setTrigger(!trigger)
  };

  useEffect(() => {
    setQuantity(product.quantity);
  }, []);

  const effectQuant = async()=> {
    if (quantity === "0") {
      await removeFromCartButton(index, product.id);
    } else {
      await quantityHandler(quantity, product.id);
    }
    setTrigger(!trigger);
  }
  useEffect(() => {
    effectQuant()
  }, [quantity]);

  return (
    <div>
      <div className="cartWindow">
        <img
          src={require(`../assets/${product.imgurl}`)}
          style={{ height: "115px", width: "115px", border:'solid' }}/>
        <div className="cartRight">
          <div className="cartmiddle">
            <div>{product.name}</div>
            <div>{product.description}</div>
            <div>
              ${product.price} / {product.unit}
            </div>
            <form>
              <h6 style={{ margin: 0 }}></h6>
              <label>Quantity: </label>
              { (quantity > 9 || item.quantity > 9)? (
                  <input type='number' value={quantity} style={{width:'78px'}} onChange={(event) => {setQuantity(event.target.value)}}></input>
              ) : (
              <select
                value={quantity}
                onChange={(event) => setQuantity(event.target.value)}>
                <option value="0">0 (delete)</option>
                <hr />
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                <option>6</option>
                <option>7</option>
                <option>8</option>
                <option>9</option>
                <option value='10'>10+</option>
              </select>)}
            </form>
          </div>
          <div className="cartbutton" onClick={() => removeFromCartButton(index, product.id)}>DELETE</div>
        </div>
      </div>
      <hr/>
    </div>
  );
};
export default CartItem;

import React, { useState, useEffect } from "react";
import {removeFromCart, editCartQuantity, getProductById} from "../api";
import "./cart.css";

const CartItem = ({
  item,
  index,
  token,
  setTrigger,
  trigger,
}) => {
  const [product, setProduct] = useState({ imgurl: "tealeaf/blacktea.jpg" });
  const [updatedQuant, setUpdatedQuant] = useState(item.quantity)
  const [firstLoad, setFirstLoad] = useState(true)
  const [reloadItem, setReloadItem] = useState(false)

    const buildProduct = async() => {
        const productfetch = await getProductById(item.productId)
        productfetch.imgurl ? null : (productfetch.imgurl = "tealeaf/blacktea.jpg");
        firstLoad ? productfetch.quantity = item.quantity : productfetch.quantity = updatedQuant;
        setProduct(productfetch)
    }

    useEffect(() => {
        buildProduct();
        setFirstLoad(false)
    },[reloadItem])

    const changeQuantity = async(num) => {
        if (num === "0") {
            await removeFromCartButton();
        } else {
            await quantityHandler(num);
        }
        setUpdatedQuant(num)
        setTrigger(!trigger)
        setReloadItem(!reloadItem)
    }

    const quantityHandler = async (num) => {
        if (token) {
          if ( num !== undefined){await editCartQuantity (token, product.id, num)}
        } else {
          const currentCart = JSON.parse(localStorage.getItem("418WhatsTeaGuestCart"));
          currentCart[index].quantity = parseInt(num);
          localStorage.setItem("418WhatsTeaGuestCart", JSON.stringify(currentCart));
        }
    };

  const removeFromCartButton = async () => {
    if (token) {
        await removeFromCart(token, product.id);
    } else {
      const currentCart = JSON.parse(localStorage.getItem("418WhatsTeaGuestCart"));
      currentCart.splice(index, 1);
      localStorage.setItem("418WhatsTeaGuestCart", JSON.stringify(currentCart));
    }
    setTrigger(!trigger)
  };

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
              { (product.quantity > 9)? (
                  <input type='number' value={product.quantity} style={{width:'78px'}} onChange={(event) => {changeQuantity(event.target.value)}}></input>
              ) : (
              <select
                value={product.quantity}
                onChange={(event) => changeQuantity(event.target.value)}>
                <option value="0">0 (delete)</option>
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
                <option value='10'>10+</option>
              </select>)}
            </form>
          </div>
          <div className="cartbutton" onClick={() => removeFromCartButton()}>DELETE</div>
        </div>
      </div>
      <hr/>
    </div>
  );
};
export default CartItem;

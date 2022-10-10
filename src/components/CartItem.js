import React, {useState} from 'react';

const CartItem = ({product, index, setCartItems}) => {

    product.imgurl ? null : product.imgurl = 'tealeaf/blacktea.jpg'
    //this is just a boring placeholder file
    const [quantity, setQuantity] = useState(1)


    //products is dummy data different from what the api will call (quanity in cart is missing)
    //remove when Cart.js is correctly calling api
    const removeFromCart = (index) => {
        const currentCart = JSON.parse(localStorage.getItem('418WhatsTeaGuestCart'))
        currentCart.splice(index, 1)
        localStorage.setItem('418WhatsTeaGuestCart', JSON.stringify(currentCart))
        setCartItems(currentCart)
    }

    //needs remove from cart button
    //needs ability to edit quantity
    return (
        <div>
            <img src={require(`../assets/${product.imgurl}`)} style={{height:'50px', width:'50px'}} />
            <>{product.name}</><br/>
            <>{product.description}</><br/>
            <>${product.price} / {product.unit}</><br/>
            <>Total: ${product.price * quantity}</>
            <form >
                <label>Quantity: {quantity}</label>
                <br/>
                <input type='number' value={quantity} onChange={() => {
                    if(event.target.value <= 0) {
                        setQuantity(1)
                    } else if(event.target.value > product.stock) {
                        setQuantity(product.stock)
                    } else { 
                        setQuantity(event.target.value) 
                    }} 
                } 
                />
            </form>
            <button onClick={() => removeFromCart(index) } >Remove from Cart</button>
        </div>
    )
}
export default CartItem
import React, {useState, useEffect} from 'react';
import { 
    removeFromCart, 
    getCartByUsername,
    editCartQuantity,
    getProductById
} from '../api';

const CartItem = ({product, index, setCartItems, token, user, setTrigger, trigger}) => {

    product.imgurl ? null : product.imgurl = 'tealeaf/blacktea.jpg'
    const [quantity, setQuantity] = useState(1)

    //products is dummy data different from what the api will call (quanity in cart is missing)
    //remove when Cart.js is correctly calling api
    const removeFromCartButton = async(index, productId) => {
        if(!token) {
            const currentCart = JSON.parse(localStorage.getItem('418WhatsTeaGuestCart'))
            currentCart.splice(index, 1)
            localStorage.setItem('418WhatsTeaGuestCart', JSON.stringify(currentCart))
            setCartItems(currentCart)
            setTrigger(!trigger)
        } else {
            const removedItem = await removeFromCart(user.id, productId, token)
            const userCart = await getCartByUsername(user.username)
            if(userCart) { 
                setCartItems(userCart)
                setTrigger(!trigger)
            }
        }
    }

    const quantityHandler = async(quantity, productId) => {
        try {
            const editedItem = await editCartQuantity(user.id, productId, quantity, token)
            return editedItem
        } catch (error) {
            throw error
        }
    }

    useEffect(() => {
        setQuantity(product.quantity)
    }, [])

    //needs remove from cart button
    //needs ability to edit quantity
    return (
        <div>
            <img src={require(`../assets/${product.imgurl}`)} style={{height:'50px', width:'50px'}} />
            <>{product.name}</><br/>
            <>{product.description}</><br/>
            <>${product.price} / {product.unit}</><br/>
            <>Total: ${product.price * quantity}</>
            <form onSubmit={async(event) => {
                event.preventDefault()
                if(token) {
                    await quantityHandler(quantity, product.id)
                }
            }} >
                <h5>*Must submit for changes to apply when placing order</h5>
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
                <button type='submit'>Submit</button>
            </form>
            <button onClick={() => removeFromCartButton(index, product.id) } >Remove from Cart</button>
        </div>
    )
}
export default CartItem
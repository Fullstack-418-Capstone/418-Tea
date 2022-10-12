import React, { useEffect, useState } from 'react';
import CartItem from './CartItem';
import { getCartByUsername, getProductById } from '../api';


const Cart = ({token, user}) => {
    const [cartItems, setCartItems] = useState([])


    //get cartItems from logged in User OR local storage and map to CartItem View

    const getCartForUser = async(username) => {
        //fetch api cart
        const userCart = await getCartByUsername(username)
        if(userCart) {
            const productList = []
            for(const item of userCart) {
                const productInfo = await getProductById(item.productId)
                productInfo.quantity = item.quantity
                productList.push(productInfo)
            }
            setCartItems(productList)
        }
        
        //setCartItems(result)
    }
    const getCartFromLocal = () => {
        //fetch from local
        const guestCart = JSON.parse(localStorage.getItem('418WhatsTeaGuestCart'))
        if(guestCart) {
            setCartItems(guestCart)
        }
    }
    
    useEffect(() => {
        token ? getCartForUser(user.username) : getCartFromLocal()
    },[token])

    const handlePlaceOrder = (event) => {
        event.preventDefault()
        if(token) {
            console.log('WIP')
        } else {
            localStorage.removeItem('418WhatsTeaGuestCart')
            setCartItems([])
            alert('Thank you for your purchase.')
        }
        //api call
    }

    return(
        <div>
            <>Hi there from the Cart View</><br/>
            <>Everything under me is a call to the CartItem.js View</>
            <hr/>
            {cartItems.length > 0 ? 
            cartItems.map((product, index) => {
                return (
                    <CartItem product={product} key={index} index={index} setCartItems={setCartItems} token={token} user={user} ></CartItem>
                )
            })
            : <>No items in cart</>
            }
            <hr/>
            <>End of calls to CartItem.js View</>
            <hr/>

            <button onClick={(event) => {handlePlaceOrder(event)}}>Place Order</button>

        </div>
    )
}
export default Cart
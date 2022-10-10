import React, { useEffect, useState } from 'react';
import CartItem from './CartItem';


const Cart = ({token, dummyProducts}) => {
    const [cartItems, setCartItems] = useState([])


    //get cartItems from logged in User OR local storage and map to CartItem View

    const getCartForUser = () => {
        //fetch api cart
        console.log('getting items from api')
        //setCartItems(result)
    }
    const getCartFromLocal = () => {
        //fetch from local
        console.log('getting items from local')
        const guestCart = JSON.parse(localStorage.getItem('418WhatsTeaGuestCart'))
        if(guestCart) {
            setCartItems(guestCart)
        }
    }
    
    useEffect(() => {
        token ? getCartForUser() : getCartFromLocal()
    },[])

    //dummy cart data .... remove once api getCartForUser and getCartFromLocal are working
    //fill cart with all products
    // useEffect(() => {
    //     const cartArr = []
    //     for(let i = 0; i< dummyProducts.length; i++){
    //         console.log('adding to cart', dummyProducts[i])
    //         cartArr.push(dummyProducts[i])
    //     }
    //     setCartItems(cartArr)
    // },[])
    //end of dummy cart data

    const handlePlaceOrder = (event) => {
        event.preventDefault()
        console.log('Placing Order')
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
                    <CartItem product={product} key={index} index={index} setCartItems={setCartItems} ></CartItem>
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
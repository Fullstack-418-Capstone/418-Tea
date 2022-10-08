import React from 'react';

const CartItem = ({product}) => {

    product.imgurl ? null : product.imgurl = 'tealeaf/blacktea.jpg'
    //this is just a boring placeholder file


    //products is dummy data different from what the api will call (quanity in cart is missing)
    //remove when Cart.js is correctly calling api


    //needs remove from cart button
    //needs ability to edit quantity
    return (
        <div>
            <img src={require(`../assets/${product.imgurl}`)} style={{height:'50px', width:'50px'}} />
            <>{product.name}</><br/>
            <>{product.description}</><br/>
            <>${product.price}</>
        </div>
    )
}
export default CartItem
import React from 'react';
import { addToCart } from '../api';


const ProductWindow = ({product, token}) => {
    product.imgurl ? null : product.imgurl = 'tealogo150.png'

    const addItem = async(product) => {
        if(token){
            const cartList = await addToCart(product.id, 1, product.price, token)
            return cartList
        } else {
            const cartList = [product]
            const currentCart = JSON.parse(localStorage.getItem('418WhatsTeaGuestCart'))
            if(currentCart) {
                cartList.push(...currentCart)
            }
            localStorage.setItem('418WhatsTeaGuestCart', JSON.stringify(cartList))
        }
    }

    return (
        <div className='productWindow'>
            <div id='productTitle' className='productDiv'>{product.name}</div>
            <img className='productDiv' src={require(`../assets/${product.imgurl}`)} style={{height:'150px', width:'150px'}} />
            <div className='productDiv'>{product.description}</div>
            {product.stock < 6 ? <div className='stockWarning'>Only {product.stock} left in stock</div>: null}
            <div className='priceBar'>
                <div>${product.price} /{product.unit}</div>
                <button onClick={() => {addItem(product)}}>Add to Cart</button>
            </div>
        </div>
    )
}
export default ProductWindow
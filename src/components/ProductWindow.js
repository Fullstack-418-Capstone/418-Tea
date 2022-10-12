import React from 'react';
import { addToCart } from '../api';


const ProductWindow = ({product, user, token}) => {

    product.imgurl ? null : product.imgurl = 'tealogo150.png'

    const productWindowStyle = {
        display:'flex',
        flexDirection:'column',
        border:'solid',
        borderRadius:'5px',
        borderColor:'#439775',
        height:'300px',
        width:'250px',
        backgroundColor:'white',
        margin:'5px',
        padding:'2px'
    }

    const addItem = async(product) => {
        if(user){
            const cartList = await addToCart(user.id, product.id, 1, product.price, token)
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
        <div style={productWindowStyle}>
            <>{product.name}</>
            <img src={require(`../assets/${product.imgurl}`)} style={{height:'150px', width:'150px'}} />
            <>{product.description}</>
            <div style={{justifyContent:'space-between'}}>
                <>{product.price} /{product.unit}</>
                <button onClick={() => {addItem(product)}}>Add to Cart</button>
            </div>
            {product.stock < 6 ? <>Only {product.stock} left in stock</>: null}
        </div>
    )
}
export default ProductWindow
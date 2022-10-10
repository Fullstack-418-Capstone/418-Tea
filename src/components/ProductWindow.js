import React from 'react';


const ProductWindow = ({product}) => {

    product.imgurl ? null : product.imgurl = 'tealeaf/blacktea.jpg'

    const asset = `../assets/${product.imgurl}`
    // console.log(asset)

    const productWindowStyle = {
        display:'flex',
        flexDirection:'column',
        border:'solid',
        borderRadius:'5px',
        height:'300px',
        width:'250px'
    }

    const addToCart = (product) => {
        const cartList = [product]
        const currentCart = JSON.parse(localStorage.getItem('418WhatsTeaGuestCart'))
        if(currentCart) {
            cartList.push(...currentCart)
        }
        localStorage.setItem('418WhatsTeaGuestCart', JSON.stringify(cartList))
    }

    return (
        <div style={productWindowStyle}>
            <>{product.name}</>
            <img src={require(`../assets/${product.imgurl}`)} style={{height:'150px', width:'150px'}} />
            <>{product.description}</>
            <div style={{justifyContent:'space-between'}}>
                <>{product.price} /{product.unit}</>
                <button onClick={() => {addToCart(product)}}>Add to Cart</button>
            </div>
            {product.stock < 6 ? <>Only {product.stock} left in stock</>: null}
        </div>
    )
}
export default ProductWindow
//this file is for a .map
import React from 'react';

const AdminSingleProductView = ({product}) => {
    
    product.imgurl ? null : product.imgurl = 'tealogo150.png'
    

    return(
        <div>
            <img src={require(`../../assets/${product.imgurl}`)} style={{height:'150px', width:'150px'}} />

            <>Name: {product.name}</>
            <br/>
            <>Description: {product.description}</>
            <br/>
            <>Type: {product.type}</>
            <br/>
            <>Unit: {product.unit}</>
            <br/>
            <>Price: {product.price}</>
            <br/>
            <>Stock: {product.stock}</>
            <br/>

            <>Sold: {product.quantitySold}</>
            <br/>

            <>Active Product?: {product.isActive? "Yes" : "No"}</>
            <hr/>
        </div>
    )
}
export default AdminSingleProductView
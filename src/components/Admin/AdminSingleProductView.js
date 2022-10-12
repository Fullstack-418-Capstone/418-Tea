//this file is for a .map
import React from 'react';
import "./AdminSingleProductView.css"

const AdminSingleProductView = ({setEdit, product}) => {
    
    product.imgurl ? null : product.imgurl = 'tealogo150.png'
    
    const handleEditButton = () => {
        setEdit(true)
    }



    return(
        <div>
            <div className="outerBox">
                <img src={require(`../../assets/${product.imgurl}`)} style={{height:'100px', width:'100px'}} />
                <div style={{display:'flex', flexDirection:'column', margin:'5px'}}>
                    <h4>{product.name}</h4>
                    <p>Type: {product.type}</p>            
                    <p>Stock: ${product.stock}</p>
                    <p>Sold: {product.quantitySold}</p>
                    <p>Active Product?: {product.isActive? "Yes" : "No"}</p>
                </div>
                <div className="pricebox">
                    <p>Price: {product.price} /{product.unit}</p>
                </div>
                <button onClick={() =>handleEditButton()}>Edit</button>
            </div>
            <div className='desc'>{product.description}</div>
            <hr/>
        </div>  
    )
}
export default AdminSingleProductView
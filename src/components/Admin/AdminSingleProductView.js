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
                    <h4 className='h4'>{product.name}</h4>
                    <p className='para'>Type: {product.type}</p>            
                    <p className='para'>Stock: {product.stock}</p>
                    <p className='para'>Sold: {product.quantitySold}</p>
                    <p className='para'>Active Product?: {product.isActive? "Yes" : "No"}</p>
                </div>
                <div className="pricebox">
                    <p className='para'>Price: ${product.price} /{product.unit}</p>
                </div>
                <button className="editbutton" onClick={() =>handleEditButton()}>Edit</button>
            </div>
            <div className='desc'>{product.description}</div>
            <hr/>
        </div>  
    )
}
export default AdminSingleProductView
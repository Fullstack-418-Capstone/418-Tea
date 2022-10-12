import React, { useState } from "react";
import "./AdminSingleProductEditView.css"



const AdminSingleProductEditView = ({product}) => {
    const [name, setName] = useState(product.name);
    const [imgurl, setImgurl] = useState(product.imgurl);
    const [type, setType] = useState(product.type);
    const [unit, setUnit] = useState(product.unit)
    const [price, setPrice] = useState(product.price);
    const [stock, setStock] = useState(product.stock);
    const [isActive, setIsActive] = useState(product.isActive);
    


    return (
        <form>
            <h4>{product.name}</h4>
            <div className="formA">
                <div className="lineitem">
                    <label>Name:</label>
                    <input className='productinput' placeholder="New name" value={name} onChange={(event) => {
                        setName(event.target.value)
                    }}></input>
                </div>
                <div className="lineitem">
                    <label>Image Link:</label>
                    <input className='productinput' placeholder="Image Url Link" value={imgurl} onChange={(event) => {
                        setImgurl(event.target.value)
                    }}></input>
                </div>
                <div className="lineitem">
                    <label>Price ($):</label>
                    <input className='productinput' placeholder="Price" value={price} onChange={(event) => {
                        setPrice(event.target.value)
                    }}></input>
                </div>
                <div className="lineitem">
                    <label>Stock:</label>
                    <input className='productinput' placeholder="Inventory Count" value={stock} onChange={(event) => {
                        setStock(event.target.value)
                    }}></input>
                </div>
                

            </div>

        </form>
    )
}

export default AdminSingleProductEditView
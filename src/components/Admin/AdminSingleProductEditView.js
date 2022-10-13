import React, { useState } from "react";
import "./AdminSingleProductEditView.css"



const AdminSingleProductEditView = ({product}) => {
    const [name, setName] = useState(product.name);
    const [imgurl, setImgurl] = useState(product.imgurl);
    const [description, setDescription] = useState(product.description)
    const [type, setType] = useState(product.type);
    const [unit, setUnit] = useState(product.unit)
    const [price, setPrice] = useState(product.price);
    const [stock, setStock] = useState(product.stock);
    const [isActive, setIsActive] = useState(product.isActive);
    
    const changeActive = () => {
        isActive ? setIsActive(false) : setIsActive(true)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        if(name && imgurl && description && price){
            console.log('Remove this console.log and plug in API call')
        }
    }

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
                <div>
                    <label>Type: </label>
                    <select className="selectbar" value={type} onChange={(event) => {
                        setType(event.target.value)
                    }}>
                        <option value='bagged'>Tea Bags</option>
                        <option value='loose'>Loose Leaf</option>
                        <option value='pot'>Kettle</option>
                        <option value='set'>Set</option>
                        <option value='cup'>Cups</option>
                    </select>
                </div>
                <div>
                    <label>Unit: </label>
                    <select className="selectbar" value={unit} onChange={(event) => {
                        setUnit(event.target.value)
                    }}>
                        <option value='box'>Box</option>
                        <option value='canister'>Canister</option>
                        <option value='each'>Each</option>
                        <option value='set'>Set</option>
                        <option value='set of 3'>Set of Three</option>
                    </select>
                </div>
                <div>
                    <label>Active: </label>
                    <input type="checkbox" checked={isActive} onChange={()=>{changeActive()}}></input>
                </div>
                <div>
                    <input className="textbox" placeholder='Description' value={description} type='textbox' onChange={(event) =>{setDescription(event.target.value)}}></input>
                </div>
                <button onClick={(event) => {
                    handleSubmit(event)}}>Submit changes</button>
            </div>
        </form>
    )
}

export default AdminSingleProductEditView
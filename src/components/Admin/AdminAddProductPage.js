import React, { useState, useEffect } from "react";
import { addNewProduct } from "../../api/index";

const AdminAddProductPage = () => {
  //const [newProduct, setNewProduct] = useState([]);
  const [name, setName] = useState("");
  const [imgurl, setImgurl] = useState("");
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState("");
  const [price, setPrice] = useState("");
  const [unit, setUnit] = useState("");
  const [type, setType] = useState("");
  const [isActive, setIsActive] = useState(true);

  const HandleSubmit = async (event) => {
    event.preventDefault();
    console.log("HELLOOOO");
    console.log(name, imgurl, description, stock, price, unit, type, isActive);
    await addNewProduct(
      name,
      description,
      stock,
      price,
      unit,
      type,
      isActive,
      imgurl
    );
  };

  return (
    <div>
      <br />
      <br />
      <form onSubmit={async (event) => await HandleSubmit(event)}>
        <input
          className="fields"
          placeholder="Name"
          value={name}
          type="text"
          onChange={(event) => {
            setName(event.target.value);
          }}
          required
        ></input>
        <input
          className="fields"
          placeholder="Image Url"
          value={imgurl}
          type="text"
          onChange={(event) => {
            setImgurl(event.target.value);
          }}
          required
        ></input>
        <input
          className="fields"
          placeholder="Product Description"
          value={description}
          type="text"
          onChange={(event) => {
            setDescription(event.target.value);
          }}
          required
        ></input>
        <input
          className="fields"
          placeholder="Stock"
          value={stock}
          type="number"
          onChange={(event) => {
            setStock(event.target.value);
          }}
          required
        ></input>
        <input
          className="fields"
          placeholder="Price"
          value={price}
          type="number"
          onChange={(event) => {
            setPrice(event.target.value);
          }}
          required
        ></input>
        <input
          className="fields"
          placeholder="Unit"
          value={unit}
          type="text"
          onChange={(event) => {
            setUnit(event.target.value);
          }}
          required
        ></input>
        <input
          className="fields"
          placeholder="Type"
          value={type}
          type="text"
          onChange={(event) => {
            setType(event.target.value);
          }}
          required
        ></input>
        <input
          className="fields"
          placeholder="Active Status"
          value={isActive}
          type="text"
          onChange={(event) => {
            setIsActive(event.target.value);
          }}
          required
        ></input>
        <button className="submit">Add New Product</button>
      </form>
    </div>
  );
};

export default AdminAddProductPage;

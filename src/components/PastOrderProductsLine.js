import React, { useEffect, useState } from "react";
import { getProductById } from "../api";
import "./pastorderproductline.css";

const PastOrderLine = ({ item }) => {
  const [product, setProduct] = useState({});
  product.imgurl ? null : (product.imgurl = "tealogo150.png");

  useEffect(() => {
    const pastOrder = async () => {
      const result = await getProductById(item.productId);
      setProduct(result);
    };
    pastOrder();
  }, []);

  return (
    <div className="design">
      <div>{product.name}</div>
      <div>{item.price}</div>
      <img
        src={require(`../assets/${product.imgurl}`)}
        style={{ height: "100px", width: "100px" }}
      />
    </div>
  );
};

export default PastOrderLine;

import React, { useEffect, useState } from "react";
import { getProductById } from "../api";

const PastOrderLine = ({ item }) => {
  const [product, setProduct] = useState({});

  useEffect(() => {
    const pastOrder = async () => {
      const result = await getProductById(item.productId);
      setProduct(result);
    };
    pastOrder();
  }, []);

  return (
    <div>
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

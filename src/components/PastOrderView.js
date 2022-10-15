import React from "react";
import PastOrderLine from "./PastOrderProductsLine";

const PastOrderView = ({ order, index }) => {
  return (
    <div>
      <h3> Order #{index + 1}</h3>
      <div style={{display: "flex"}}>
      {order.map((item, i) => {
        return <PastOrderLine key={i} item={item}></PastOrderLine>;
      })}
      </div>
    </div>
  );
};

export default PastOrderView;

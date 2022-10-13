import React from "react";
import PastOrderLine from "./PastOrderProductsLine";

const PastOrderView = ({ order }) => {
  return (
    <div>
      <h3> Order #{order[0].orderId}</h3>
      {order.map((item, i) => {
        return <PastOrderLine key={i} item={item}></PastOrderLine>;
      })}
    </div>
  );
};

export default PastOrderView;

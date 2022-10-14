import React, { useState, useEffect } from "react";
import SingleProductViewHandler from "./SingleProductViewHandler";
import { getAllProducts } from "../../api/index";

const AdminProductsPage = ({ token }) => {
  const [allProducts, setAllProducts] = useState([]);
  const [edits, setEdits] = useState(0);

  const setGatheredProducts = async () => {
    const gatheredProducts = await getAllProducts();
    gatheredProducts.sort(compareName);
    setAllProducts(gatheredProducts);
  };

  useEffect(() => {
    setGatheredProducts();
  }, [edits]);

  const compareName = (a, b) => {
    if (a.name < b.name) {
      return -1;
    } else if (a.name > b.name) {
      return 1;
    } else {
      return 0;
    }
  };

  return (
    <div>
      <div style={{ fontSize: "32px" }}>All Products</div>
      <hr />
      {allProducts[0]
        ? allProducts.map((product) => {
            return (
              <SingleProductViewHandler
                token={token}
                product={product}
                key={product.id}
                edits={edits}
                setEdits={setEdits}
              ></SingleProductViewHandler>
            );
          })
        : null}
    </div>
  );
};
export default AdminProductsPage;

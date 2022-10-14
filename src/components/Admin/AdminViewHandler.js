import React, { useState } from "react";
import AdminProductsPage from "./AdminProductsPage";
import AdminUsersPage from "./AdminUsersPage";
import FilterButton from "../FilterButtonView";
import AdminAddProductPage from "./AdminAddProductPage";

const AdminViewHandler = ({ token }) => {
  const [tab, setTab] = useState("products");

  const buttonBar = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  };
  return (
    <div>
      <div style={buttonBar}>
        <FilterButton
          filter="products"
          setFilterWord={setTab}
          title={"PRODUCTS"}
        ></FilterButton>
        <FilterButton
          filter="users"
          setFilterWord={setTab}
          title={"USERS"}
        ></FilterButton>
        <FilterButton
          filter="add-product"
          setFilterWord={setTab}
          title={"ADD PRODUCT"}
        ></FilterButton>
      </div>

      {tab === "products" ? (
        <AdminProductsPage token={token}></AdminProductsPage>
      ) : null}
      {tab === "users" ? <AdminUsersPage token={token}></AdminUsersPage> : null}
      {tab === "add-product" ? (
        <AdminAddProductPage token={token}></AdminAddProductPage>
      ) : null}
    </div>
  );
};

export default AdminViewHandler;

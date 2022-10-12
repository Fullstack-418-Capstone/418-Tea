import React, { useState } from "react";
import AdminSingleProductEditView from "./AdminSingleProductEditView";
import AdminSingleProductView from "./AdminSingleProductView";

const SingleProductViewHandler = ({product}) => {
    const [edit, setEdit] = useState(false);



    return (
        <div>
            {edit ? <AdminSingleProductEditView
            product={product}
            ></AdminSingleProductEditView>: <AdminSingleProductView
            product={product}
            setEdit={setEdit}></AdminSingleProductView>}
        </div>                
    )
}
export default SingleProductViewHandler
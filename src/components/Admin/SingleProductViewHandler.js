import React, { useState } from "react";
import AdminSingleProductEditView from "./AdminSingleProductEditView";
import AdminSingleProductView from "./AdminSingleProductView";

const SingleProductViewHandler = ({token, product, edits, setEdits}) => {
    const [edit, setEdit] = useState(false);

    return (
        <div>
            {edit ? <AdminSingleProductEditView
            token={token}
            product={product}
            setEdit={setEdit}
            edits={edits}
            setEdits={setEdits}
            ></AdminSingleProductEditView>: <AdminSingleProductView
            product={product}
            setEdit={setEdit}></AdminSingleProductView>}
        </div>                
    )
}
export default SingleProductViewHandler
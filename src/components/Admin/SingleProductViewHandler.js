import React, { useState } from "react";
import AdminSingleProductView from "./AdminSingleProductView";

const SingleProductViewHandler = ({product}) => {
    const [edit, setEdit] = useState(false);



    return (
        <div>
            {edit ? <>time to edit</> : <AdminSingleProductView
            product={product}
            setEdit={setEdit}></AdminSingleProductView>}
        </div>                
    )
}
export default SingleProductViewHandler
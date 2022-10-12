import React, { useState } from "react";
import AdminSingleUserView from "./AdminSingleUserView";

const SingleUserViewHandler = ({user}) => {
    const [edit, setEdit] = useState(false);



    return (
        <div>
            {edit ? <>time to editUser</> : <AdminSingleUserView
            user={user}
            setEdit={setEdit}></AdminSingleUserView>}
        </div>                
    )
}
export default SingleUserViewHandler
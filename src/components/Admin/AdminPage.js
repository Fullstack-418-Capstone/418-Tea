import React, { useState } from 'react';
import AdminLogin from './AdminLogIn';
import AdminViewHandler from './AdminViewHandler';


const AdminPage = ({isAdmin}) => {
    const [adminToken, setAdminToken] = useState('')
   


    return (
        <div>
            <>This is the Admin Page</><br/>
            {adminToken ? <AdminViewHandler adminToken = {adminToken}></AdminViewHandler>
            : <AdminLogin setAdminToken={setAdminToken}></AdminLogin>}

        </div>
    )
}

export default AdminPage
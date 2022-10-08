import React, { useState } from 'react';
import AdminLogin from './AdminLogIn';
import AdminViewHandler from './AdminViewHandler';


const AdminPage = () => {
    const [adminToken, setAdminToken] = useState('')
    /*
    I think it makes sense to require an admin LogIn everytime the page is accessed.
    -no link to page just url /admin
    -when accessed user must relog in 
    log in sets an admin token that (1) indicates logged in and (2) gets send for API cals
    once admin token exists the page view changes to products/users tabs
    -Fred
    */


    return (
        <div>
            <>This is the Admin Page</><br/>
            {adminToken ? <AdminViewHandler adminToken = {adminToken}></AdminViewHandler>
            : <AdminLogin setAdminToken={setAdminToken}></AdminLogin>}

        </div>
    )
}

export default AdminPage
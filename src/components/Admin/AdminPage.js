import React from 'react';
import AdminViewHandler from './AdminViewHandler';


const AdminPage = ({isAdmin}) => {
   


    return (
        <div>
            <br/>
            {isAdmin ? <AdminViewHandler isAdmin={isAdmin}></AdminViewHandler>
            : <>You need to be an Admin to see this page.</>}

        </div>
    )
}

export default AdminPage
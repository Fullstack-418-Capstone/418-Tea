import React from 'react';
import AdminViewHandler from './AdminViewHandler';

const AdminPage = ({token, isAdmin}) => {

    return (
        <div>
            <br/>
            {isAdmin ? <AdminViewHandler token={token} isAdmin={isAdmin}></AdminViewHandler>
            : <>You need to be an Admin to see this page.</>}
        </div>
    )
}

export default AdminPage
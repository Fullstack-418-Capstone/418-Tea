import React, {useState} from 'react';
import AdminProductsPage from './AdminProductsPage';
import AdminUsersPage from './AdminUsersPage';


//this page will have the buttons to switch between products and users and anything else we think of

const AdminViewHandler = ({adminToken}) => {
    const [tab, setTab] = useState('products');


    const showProducts = (event) => {
        event.preventDefault();
        setTab('products')
    }
    const showUsers = (event) => {
        event.preventDefault();
        setTab('users')
    }
    
    //just base level styling
    const fakeButtonStyle = {
        border:'solid',
        borderRadius:'3px',
        height:'30px',
        backgroundColor:'wheat'
    }


    return(
        <div>
            <>Admin Switch View</>
            <div style={{display:'flex',flexDirection:'row'}}>
                <div style={fakeButtonStyle} onClick={(event) => {showProducts(event)}}>Products</div>
                <div style={fakeButtonStyle} onClick={(event) => {showUsers(event)}}>Users</div>
            </div>
            {/* this could be a single turnary but left as two incase we add more admin pages*/}
            {tab === 'products' ? <AdminProductsPage adminToken={adminToken}></AdminProductsPage> : null}
            {tab === 'users' ? <AdminUsersPage adminToken={adminToken}></AdminUsersPage> : null}

        </div>
    )
}

export default AdminViewHandler
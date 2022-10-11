import React, {useState} from 'react';
import AdminProductsPage from './AdminProductsPage';
import AdminUsersPage from './AdminUsersPage';
import FilterButton from '../FilterButtonView';


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
    const buttonBar = {
        display:'flex',
        flexDirection:'row',
        justifyContent:"center"
    }


    return(
        <div>
            <div style={buttonBar}>
                <FilterButton filter='products' setFilterWord={setTab} title = {"PRODUCTS"}></FilterButton>
                <FilterButton filter='users' setFilterWord={setTab} title = {"USERS"}></FilterButton>
            </div>

            {/* this could be a single turnary but left as two incase we add more admin pages*/}
            {tab === 'products' ? <AdminProductsPage adminToken={adminToken}></AdminProductsPage> : null}
            {tab === 'users' ? <AdminUsersPage adminToken={adminToken}></AdminUsersPage> : null}

        </div>
    )
}

export default AdminViewHandler
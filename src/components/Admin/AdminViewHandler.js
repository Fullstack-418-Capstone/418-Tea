import React, {useState} from 'react';
import AdminProductsPage from './AdminProductsPage';
import AdminUsersPage from './AdminUsersPage';
import FilterButton from '../FilterButtonView';


const AdminViewHandler = ({token}) => {
    const [tab, setTab] = useState('products');

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

            {tab === 'products' ? <AdminProductsPage token={token}></AdminProductsPage> : null}
            {tab === 'users' ? <AdminUsersPage token={token}></AdminUsersPage> : null}

        </div>
    )
}

export default AdminViewHandler
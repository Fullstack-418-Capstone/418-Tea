import React, { useEffect, useState } from 'react';
import AdminSingleUserView from './AdminSingleUserView';
import { getAllUsers } from '../../api/index'


const AdminUsersPage = () => {
    const [allUsers, setAllUsers] = useState([])

    //tier 4 add a user search bar

    const setGatheredUsers = async() =>{
        const gatheredUsers = await getAllUsers();
        setAllUsers(gatheredUsers);
    }

    useEffect(() => {
        setGatheredUsers()
    }, []);

    return(
        <div>
            <div style={{fontSize:'32px'}}>All Users</div><hr/>
            {allUsers[0] ? allUsers.map((user, index) => {
                return (
                    <AdminSingleUserView key={index} user={user}></AdminSingleUserView>
                )
            })
            
            : null}
        </div>
    )
}
export default AdminUsersPage
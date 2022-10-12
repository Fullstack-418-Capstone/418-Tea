import React, { useEffect, useState } from 'react';
import AdminSingleUserView from './AdminSingleUserView';
import { getAllUsers } from '../../api/index'


const AdminUsersPage = () => {
    const [allUsers, setAllUsers] = useState([])

    //tier 4 add a user search bar

    const setGatheredUsers = async() =>{
        const gatheredUsers = await getAllUsers();
        console.log(gatheredUsers)
        setAllUsers(gatheredUsers);
    }

    useEffect(() => {
        setGatheredUsers()
    }, []);

    return(
        <div>
            <>List of All Users</><hr/>
            {allUsers[0] ? allUsers.map((user) => {
                return (
                    <AdminSingleUserView key={user.id} user={user}></AdminSingleUserView>
                )
            })
            
            : null}
        </div>
    )
}
export default AdminUsersPage
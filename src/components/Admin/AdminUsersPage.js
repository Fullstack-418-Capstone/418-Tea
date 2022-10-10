import React, { useEffect, useState } from 'react';
import AdminSingleUserView from './AdminSingleUserView';


const AdminUsersPage = () => {
    const [allUsers, setAllUsers] = useState([])

    //tier 4 add a user search bar

    //upon loading call getAllUsers from API and setAllUsers to the result

    //dummy users
    const setDummyUsers = () => {
        const dummyUsers = [
            {id:1, name:'Frank'},
            {id:2, name:'Tony'}
        ]
        setAllUsers(dummyUsers)
    }
    useEffect(() => {
        setDummyUsers()
    },[])
    //end of dummyusers

    return(
        <div>
            <>This is where ALL USERS would load, regardless of isActive status</><br/>
            {allUsers[0] ? allUsers.map((user, index) => {
                return (
                    <AdminSingleUserView user={user}></AdminSingleUserView>
                )
            })
            
            : null}
        </div>
    )
}
export default AdminUsersPage
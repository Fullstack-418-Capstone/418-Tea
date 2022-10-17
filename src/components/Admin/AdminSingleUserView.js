import React from 'react';

const AdminSingleUserView = ({user}) => {

    return(
    <>
        <>Username: {user.username}</>
        <br/>
        <>Name: {user.firstname} {user.lastname}</>
        <br/>
        <>Email: {user.email}</>
        <br/>
        <>Address: {user.address1}, {user.address2 ? `${user.address2},` : ""} {user.city}, {user.state} {user.zipcode}</>
        <br/>
        <>Active User?: {user.isActive? 'Yes' : 'No'}</>
        <hr/>
    </>
    )
}
export default AdminSingleUserView
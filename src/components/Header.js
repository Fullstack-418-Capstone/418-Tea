import React from "react";
import { Link } from "react-router-dom";
import Login from "./Login";


const Header = (props) => {
    const {loggedIn, isAdmin, setLoggedIn, setToken, setUser, setIsAdmin} = props

    return (
        <>
            <img src={require("../assets/yellowChip100.jpg")} alt='temporary logo' />
                <Link to='/' ><h1>What's the Tea?</h1></Link>
            <nav>
                <Link to='/tea-ware' >Tea Ware</Link> <br/>
                <Link to='/tea' >Tea</Link> <br/>
                <Link to='/cart/:userId' >Cart</Link> <br/>
                {loggedIn ? null : <><Link to='/register' >Register</Link> <br/> </> }
                {loggedIn ? <Link to='/logout' >Log Out</Link> : <Login setUser={setUser} setIsAdmin={setIsAdmin} setToken={setToken} setLoggedIn={setLoggedIn} /> } <br/>
                {isAdmin ? <Link to='/admin-view' >Admin Items</Link> : null }
            </nav>
        </>
    )
}

export default Header
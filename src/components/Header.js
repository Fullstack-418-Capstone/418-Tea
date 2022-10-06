import React from "react";
import { Link } from "react-router-dom";


const Header = (props) => {
    const {loggedIn, isAdmin} = props

    return (
        <>
            <img src={require("../assets/yellowChip100.jpg")} alt='temporary logo' />
                <Link to='/' ><h1>What's the Tea?</h1></Link>
            <nav>
                <Link to='/tea-ware' >Tea Ware</Link> <br/>
                <Link to='/tea' >Tea</Link> <br/>
                <Link to='/cart/:userId' >Cart</Link> <br/>
                {loggedIn ? null : <><Link to='/register' >Register</Link> <br/> </> }
                {loggedIn ? <Link to='/logout' >Log Out</Link> : <Link to='/login' >Log In</Link> } <br/>
                {isAdmin ? <Link to='/admin-view' >Admin Items</Link> : null }
            </nav>
        </>
    )
}

export default Header
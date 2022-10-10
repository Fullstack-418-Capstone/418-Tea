import React from "react";
import { Link } from "react-router-dom";
import Login from "./Login";


const Header = (props) => {
    const {token, isAdmin, setLoggedIn, setToken, setUser, setIsAdmin} = props



    const headerStyle = {
        backgroundColor:'green',
        display:'flex',
        flexDirection:'row'
    }
    const handleLogOut = (event) => {
        event.preventDefault();
        setToken(null);
        localStorage.setItem('418WhatsTeaToken', null)
    }
    return (
        <div style={headerStyle}>
            <img src={require("../assets/yellowChip100.jpg")} alt='temporary logo' />
                <Link to='/' ><h1>What's the Tea?</h1></Link>
    
                <Link to='/tea-ware' >Tea Ware</Link> <br/>
                <Link to='/tea-leaf' >Tea</Link> <br/>
                <Link to='/cart' >Cart</Link> <br/>
                {token ? null : <><Link to='/register' >Register</Link> <br/> </> }
                {token ? 
                <button onClick={(event) =>{handleLout(event)}}>Log Out</button>
                : <Login setUser={setUser} setIsAdmin={setIsAdmin} setToken={setToken} setLoggedIn={setLoggedIn} /> } <br/>
                {isAdmin ? <Link to='/admin-view' >Admin Items</Link> : null }
     
        </div>
    )
}

export default Header
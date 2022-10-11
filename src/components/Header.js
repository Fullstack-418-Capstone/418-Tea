import React from "react";
import { Link } from "react-router-dom";
import Login from "./Login";


const Header = (props) => {
    const {token, isAdmin, setToken, setUser, setIsAdmin} = props



    const headerStyle = {
        backgroundColor:'green',
        display:'flex',
        flexDirection:'row'
    }
    const handleLogOut = (event) => {
        event.preventDefault();
        setToken("");
        setIsAdmin(false);
        localStorage.removeItem('418WhatsTeaToken')
    }
    return (
        <div style={headerStyle}>
            <img src={require("../assets/logo150.png")} alt='temporary logo' />
                <Link to='/' ><h1>What's the Tea?</h1></Link>
    
                <Link to='/tea-ware' >Tea Ware</Link> <br/>
                <Link to='/tea-leaf' >Tea</Link> <br/>
                <Link to='/cart' >Cart</Link> <br/>
                {token ? null : <><Link to='/register' >Register</Link> <br/> </> }
                {token ? 
                <button onClick={(event) =>{handleLogOut(event)}}>Log Out</button>
                : <Login setUser={setUser} setIsAdmin={setIsAdmin} setToken={setToken} /> } <br/>
                {isAdmin ? <Link to='/admin' >Admin</Link> : null }
        </div>
    )
}

export default Header
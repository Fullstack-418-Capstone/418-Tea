import React, {useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../api/index";

const Login = (props) => {
    const {setUser, setToken, setIsAdmin} = props
    const [usernameString, setUsernameString] = useState('')
    const [passwordString, setPasswordString] = useState('')
    const navigate = useNavigate()

    return (
        <form
            onSubmit={async(event) => {
                event.preventDefault()
                const success = await loginUser(usernameString, passwordString, setToken, setUser, setIsAdmin)
                if(success) {
                    setUsernameString('')
                    setPasswordString('')
                    navigate('/')
                }
            }}
        >
            <input
                value={usernameString}
                onChange={(event) => setUsernameString(event.target.value) }
                placeholder='username'
                required
            />
            <br/>
            <input
                value={passwordString} 
                onChange={(event) => setPasswordString(event.target.value)} 
                placeholder='password'
                type='password' 
                required
            />
            <br/>
            <div style={{justifyContent:'space-between'}}>
                <button type="submit">Log In</button>
                <Link to='/register' >Register</Link>
            </div>
        </form>
    )

}

export default Login
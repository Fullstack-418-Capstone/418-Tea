import React, {useState} from "react";

const Login = (props) => {
    const {setUser, setToken, setLoggedIn, setIsAdmin} = props
    const [usernameString, setUsernameString] = useState('')
    const [passwordString, setPasswordString] = useState('')

    return (
        <form
            onSubmit={async(event) => {
                event.preventDefault()
                event.preventDefault();
                const success = await loginUser(usernameString, passwordString, setToken, setLogin, setUser)
                if(success) {
                    setUsernameString('')
                    setPasswordString('')
                }
            }}
        >
            <label>Username:</label>
            <input
                value={usernameString}
                onChange={(event) => setUsernameString(event.target.value) }
                required
            />
            <br/>
            <label>Password:</label>
            <input
                value={passwordString} 
                onChange={(event) => setPasswordString(event.target.value)} 
                type='password' 
                required
            />
            <br/>
            <button type="submit">Log In</button>
        </form>
    )

}

export default Login
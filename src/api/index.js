// for all API call functions
const BASE_URL = "http://localhost:3000/api";

export const loginUser = async(username, password, setToken, setLoggedIn, setUser) => {
    let success;

    try {
        const response = await fetch(`${BASE_URL}/users/login`, {
            method: "POST",
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                password      
            })
        })
        const data = await response.json()

        if(data.token) {
            setToken(data.token)
            setUser(username)
            setLoggedIn(true)
            localStorage.setItem('418WhatsTeaToken', data.token)
            localStorage.setItem('418WhatsTeaUser', data.user)
            success = true
        } else {
            success=false
        }
        
        alert(data.message)
        return success
    } catch (error) {
        console.error(error)
    }
}
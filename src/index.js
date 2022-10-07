import React, {useState, useEffect} from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import {
    Header,
    HomePage
} from './components'

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [token, setToken] = useState('')
  const [user, setUser] = useState('')

  useEffect(() => {
    if(localStorage.getItem('418WhatsTeaToken') && !token) {
        const {username, isAdmin: userAdmin} = localStorage.getItem('418WhatsTeaUser')
        setLoggedIn(true)
        setToken(localStorage.getItem('418WhatsTeaToken'))
        setUser(username)
        setIsAdmin(userAdmin)
    }
  }, [])

  return (<Router>
    <div>
        <header>
            <Header loggedIn={loggedIn} isAdmin={isAdmin} />
        </header>
        <main>
            <Routes>
                <Route path="/" element={<HomePage />} />
            </Routes>
        </main>
    </div>
  </Router>);
};

const container = document.getElementById("app");
const root = createRoot(container);
root.render(<App />);

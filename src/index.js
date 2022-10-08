import React, {useState, useEffect} from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import {
    Header,
    HomePage,
    Register,
    TeaLeaf,
    TeaWare
} from './components'

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false)//why does this exist? If a user is logged in, there will be a token, just check if token exists? -Fred
  const [isAdmin, setIsAdmin] = useState(false)
  const [token, setToken] = useState('')
  const [user, setUser] = useState('')//why does this exist? -Fred

  useEffect(() => {
    if(localStorage.getItem('418WhatsTeaToken') && !token) {
        const {username, isAdmin: userAdmin} = localStorage.getItem('418WhatsTeaUser')
        setLoggedIn(true)
        setToken(localStorage.getItem('418WhatsTeaToken'))
        setUser(username)
        setIsAdmin(userAdmin)
    }
  }, [])

  //useEffect(() => {}, [loggedIn])

  /* example login
  const localLogin = () => {
    const localToken = localStorage.getItem('418WhatsTeaToken');
    if(localToken && localToken !== 'null'){
      setToken(localToken);
    }
  }
  useEffect(() => {
    localLogin();
  }, [])
  */

  return (
    <Router>
      <div>
          <header>
              <Header token={token} isAdmin={isAdmin} setLoggedIn={setLoggedIn} setToken={setToken} setUser={setUser} setIsAdmin={setIsAdmin} />
          </header>
          <main>
              <Routes>
                <Route path='/register' element = {
                  <Register setToken={setToken}></Register>
                }></Route>
                <Route path='/tea-leaf' element = {
                  <TeaLeaf></TeaLeaf>
                }></Route>
                <Route path='/tea-ware' element = {
                  <TeaWare></TeaWare>
                }></Route>
                  <Route path="/" element={<HomePage />} />
              </Routes>
          </main>
      </div>
    </Router>);
};

const container = document.getElementById("app");
const root = createRoot(container);
root.render(<App />);

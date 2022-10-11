import React, {useState, useEffect} from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import {
    Header,
    HomePage,
    Register,
    TeaLeaf,
    TeaWare,
    Cart,
    AdminPage,
    Profile
} from './components'

const App = () => {
  const [isAdmin, setIsAdmin] = useState(false)
  const [token, setToken] = useState('')
  const [user, setUser] = useState({})

  useEffect(() => {
    if(localStorage.getItem('418WhatsTeaToken') && !token) {
        const localUser = JSON.parse(localStorage.getItem('418WhatsTeaUser'))
        setToken(localStorage.getItem('418WhatsTeaToken'))
        setUser(localUser)
        setIsAdmin(localUser.isAdmin)
    }
  }, [])

  useEffect(() => {}, [token])

return (
  <Router>
    <div>
        <header>
            <Header token={token} isAdmin={isAdmin} setToken={setToken} setUser={setUser} setIsAdmin={setIsAdmin} />
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
              <Route path='/cart' element = {
                <Cart token={token} user={user} ></Cart>
              }></Route>
              <Route path='/profile' element = {
                <Profile token={token} ></Profile>
              }></Route>
              <Route path='/admin' element = {
                <AdminPage isAdmin={isAdmin}></AdminPage>
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

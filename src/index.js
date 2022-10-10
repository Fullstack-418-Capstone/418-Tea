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
    AdminPage
} from './components'
import AdminViewHandler from "./components/Admin/AdminViewHandler";

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false)//this is reduntant, no? If a user is logged in, there will be a token, just check if token is not null -Fred
  const [isAdmin, setIsAdmin] = useState(false) //I think this can be simplified as well, explained in AdminPage.js
  const [token, setToken] = useState('')
  const [user, setUser] = useState('')

  const [dummyProducts, setDummyProducts] = useState([]) //to be deleted later

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




//dummy data
const setDummyData = () => {
  console.log('running dummyData')
  const productsToCreate = [
      {
      name: 'Asian Green Tea',
      imgurl: 'tealeaf/greentea.jpg',
      description: "Take a sip of liquid silver",
      stock: 35,
      unit: "canister",
      type: "loose",
      price: 24
  },{
      name: 'Ehugos Glass Teapot',
      imgurl: 'teapots/navy.jpg',
      description: "Sit back, watch, and KNOW when you're tea is ready",
      stock: 4,
      unit: "each",
      type: "pot",
      price: 32
  }, {
      name: 'Lipton Earl Grey',
      description: "Take a sip of liquid silver",
      stock: 3,
      unit: "box",
      type: "bagged",
      price: 19
  }]
  setDummyProducts(productsToCreate)
}
useEffect(() => {
  setDummyData();
},[])
//end of dummydata


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
                <TeaLeaf dummyProducts={dummyProducts}></TeaLeaf>
              }></Route>
              <Route path='/tea-ware' element = {
                <TeaWare dummyProducts={dummyProducts}></TeaWare>
              }></Route>
              <Route path='/cart' element = {
                <Cart token={token} dummyProducts={dummyProducts}></Cart>
              }></Route>
              <Route path='/admin' element = {
                <AdminPage isAdmin={isAdmin} dummyProducts={dummyProducts}></AdminPage>
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

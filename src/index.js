import React, {useState} from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import {
    Header,
    HomePage
} from './components'

const App = () => {
  const [loggedIn, serLoggedIn] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [token, setToken] = useState('')
  const [cart, setCart] = useState([])

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

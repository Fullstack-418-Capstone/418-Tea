import React, {useState} from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import {
    Header
} from './components'

const App = () => {
  const [loggedIn, serLoggedIn] = useState(false)

  return (<Router>
    <div>
        <header>
            <Header loggedIn={loggedIn} />
        </header>
        <main>
            <Routes>
                <Route path="/" element={<h1>Placeholder body</h1>} />
            </Routes>
        </main>
    </div>
  </Router>);
};

const container = document.getElementById("app");
const root = createRoot(container);
root.render(<App />);

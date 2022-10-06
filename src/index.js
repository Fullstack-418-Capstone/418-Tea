import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  

  return (<Router>
    <div>
        <header>
            <h1>Placeholder header</h1>
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

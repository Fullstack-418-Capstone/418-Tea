// import React from "react";
import { createRoot } from "react-dom/client";

const App = () => {
  const BASE_URL = "http://localhost:3000/api";

  return <h1>What's the tea</h1>;
};

const container = document.getElementById("app");
const root = createRoot(container);
root.render(<App />);

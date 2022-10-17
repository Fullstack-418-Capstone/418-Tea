import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../api/index";
import "./login.css";

const Login = ({ setToken, setIsAdmin }) => {
  const [usernameString, setUsernameString] = useState("");
  const [passwordString, setPasswordString] = useState("");
  const navigate = useNavigate();

  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault();
        const success = await loginUser(
          usernameString,
          passwordString,
          setToken,
          setIsAdmin
        );
        if (success) {
          setUsernameString("");
          setPasswordString("");
          navigate("/");
        } else {
          alert("Incorrect username or password.");
        }
      }}
    >
      <input
        value={usernameString}
        onChange={(event) => setUsernameString(event.target.value)}
        placeholder="Username"
        required
        className="field"
      />
      <br />
      <input
        value={passwordString}
        onChange={(event) => setPasswordString(event.target.value)}
        placeholder="Password"
        type="password"
        required
        className="field"
      />
      <br />
      <div style={{ justifyContent: "space-between" }}>
        <button id="button" type="submit">
          Log In
        </button>
        <button>
          <Link to="/register">Register</Link>
        </button>
      </div>
    </form>
  );
};

export default Login;

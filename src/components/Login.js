import React, { useState } from "react";
import { Link } from "react-router-dom";
import { loginUser } from "../api/index";
import "./login.css";

const Login = (props) => {
  const { setUser, setToken, setIsAdmin } = props;
  const [usernameString, setUsernameString] = useState("");
  const [passwordString, setPasswordString] = useState("");

  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault();
        const success = await loginUser(
          usernameString,
          passwordString,
          setToken,
          setUser,
          setIsAdmin
        );
        if (success) {
          setUsernameString("");
          setPasswordString("");
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

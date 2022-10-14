import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Login from "./Login";
import "./header.css";

const Header = (props) => {
  const { token, isAdmin, setToken, setUser, setIsAdmin } = props;
  const navigate = useNavigate();

  const handleLogOut = (event) => {
    event.preventDefault();
    setToken("");
    setIsAdmin(false);
    localStorage.removeItem("418WhatsTeaToken");
    navigate("/");
  };
  return (
    <div className="header">
      <Link to="/">
        {" "}
        <img
          src={require("../assets/tealogotransparent150.png")}
          alt="temporary logo"
          className="headLink"
        />
      </Link>
      <Link to="/tea-leaf" className="headLink">
        Tea
      </Link>{" "}
      <br />
      <Link to="/tea-ware" className="headLink">
        Accessories
      </Link>{" "}
      <br />
      <Link to="/cart" className="headLink">
        Cart
      </Link>{" "}
      <br />
      {token ? (
        <>
          <Link to="/profile" className="headLink">
            Profile
          </Link>{" "}
          <br />
        </>
      ) : null}
      {isAdmin ? (
        <Link to="/admin" className="headLink">
          Admin
        </Link>
      ) : null}
      {token ? (
        <button
          id="logout"
          onClick={(event) => {
            handleLogOut(event);
          }}
        >
          Log Out
        </button>
      ) : (
        <Login setUser={setUser} setIsAdmin={setIsAdmin} setToken={setToken} />
      )}{" "}
      <br />
    </div>
  );
};
export default Header;


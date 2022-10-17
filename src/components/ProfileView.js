import React from "react";
import { useState, useEffect } from "react";
import { editUserInformation, showOrders } from "../api";
import PastOrderView from "./PastOrderView";
import "./profileview.css";

const Profile = ({ token }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const results = await showOrders(token);
      setOrders(results);
    };
    fetchOrders();
  }, [token]);

  const HandleChanges = async (event) => {
    event.preventDefault();
    await editUserInformation(token, firstName, lastName, password);
    setFirstName("");
    setLastName("");
    setPassword("");
  };

  return (
    <div>
      <h1> Welcome to Your Profile Page! </h1>
      <div>
        <h3> Edit Personal Information: </h3>
        <form onSubmit={HandleChanges}>
          <input
            placeholder="Edit First Name"
            type="text"
            value={firstName}
            onChange={(event) => {
              setFirstName(event.target.value);
            }}
            className="edit"
          ></input>
          <input
            placeholder="Edit Last Name"
            type="text"
            value={lastName}
            onChange={(event) => {
              setLastName(event.target.value);
            }}
            className="edit"
          ></input>
          <input
            placeholder="Edit Password"
            type="text"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
            className="edit"
          ></input>
          <button className="changes"> Make Changes </button>
        </form>
      </div>

      <div>
        <h3> Your Previous Orders: </h3>
        {orders[0]
          ? orders.map((order, i) => {
              return (
                <PastOrderView key={i} order={order} index={i}></PastOrderView>
              );
            })
          : null}
      </div>
    </div>
  );
};

export default Profile;

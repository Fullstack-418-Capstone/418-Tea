import React from "react";
import { useState, useEffect } from "react";
import { editUserInformation } from "../api";
import PastOrderView from "./PastOrderView";

const Profile = ({ user, token }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [orders, setOrders] = useState([]);

  const BASE_URL = "http://localhost:3001/api";

  useEffect(() => {
    const fetchOrders = async () => {
      const results = await showOrders(user.id);
      setOrders(results);
    };
    fetchOrders();
  }, [token]);

  const showOrders = async (userid) => {
    const response = await fetch(`${BASE_URL}/orders/order/${userid}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data;
  };

  const HandleChanges = async (event) => {
    event.preventDefault();
    await editUserInformation(
      token,
      firstName,
      lastName,
      password
    );
    setFirstName("");
    setLastName("");
    setPassword("");
  };

  return (
    <div>
      <h1> Welcome to Your Profile Page! </h1>
      <div>
        <h3> Edit Personal Information </h3>
        <form onSubmit={HandleChanges}>
          <input
            placeholder="Edit First Name"
            type="text"
            value={firstName}
            onChange={(event) => {
              setFirstName(event.target.value);
            }}
          ></input>
          <input
            placeholder="Edit Last Name"
            type="text"
            value={lastName}
            onChange={(event) => {
              setLastName(event.target.value);
            }}
          ></input>
          <input
            placeholder="Edit Password"
            type="text"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          ></input>
          <button> Make Changes </button>
        </form>
      </div>

      <div>
        <h3> Your Previous Orders </h3>
        {orders[0]
          ? orders.map((order, i) => {
              return <PastOrderView key={i} order={order} index={i} ></PastOrderView>;
            })
          : null}
      </div>
    </div>
  );
};

export default Profile;

import React from "react";
import { useState, useEffect } from "react";
import { getUserByUsername } from "../api";
import { editUserInformation } from "../api";
import PastOrderView from "./PastOrderView";

const Profile = ({ user, token }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  //const [address, setAddress] = useState("");
  //const [userState, setUserState] = useState("");
  //const [city, setCity] = useState("");
  //const [zipcode, setZipCode] = useState("");
  const [orders, setOrders] = useState([]);

  const BASE_URL = "http://localhost:3001/api";

  useEffect(() => {
    const fetchOrders = async () => {
      console.log("USER HERE", user);
      const results = await showOrders(user.id);
      console.log("USERRRRRR, making it test", user.id);
      console.log("RESULTSSSS", results);
      setOrders(results);
    };
    fetchOrders();
  }, [token]);

  const showOrders = async (userid) => {
    console.log("USERR IDDDD, needed for route", userid);
    const response = await fetch(`${BASE_URL}/orders/order/${userid}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    console.log("DATAAAA", data);
    return data;
  };

  const HandleChanges = async (event) => {
    event.preventDefault();
    await editUserInformation(
      firstName,
      lastName,
      password
      //   address,
      //   userState,
      //   city,
      //   zipcode,
      //   token
    );
    setFirstName("");
    setLastName("");
    setPassword("");
    // setAddress("");
    // setUserState("");
    // setCity("");
    // setZipCode("");
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
          {/* <input
            placeholder="Edit Address"
            type="text"
            value={address}
            onChange={(event) => {
              setAddress(event.target.value);
            }}
          ></input>
          <input
            placeholder="Edit State"
            type="text"
            value={userState}
            onChange={(event) => {
              setUserState(event.target.value);
            }}
          ></input>
          <input
            placeholder="Edit City"
            type="text"
            value={city}
            onChange={(event) => {
              setCity(event.value.target);
            }}
          ></input>
          <input
            placeholder="Edit Zip Code"
            type="text"
            value={zipcode}
            onChange={(event) => {
              setZipCode(event.value.target);
            }}
          ></input> */}
          <button> Make Changes </button>
        </form>
      </div>

      <div>
        <h3> Your Previous Orders </h3>
        {orders[0]
          ? orders.map((order, i) => {
              return <PastOrderView key={i} order={order}></PastOrderView>;
            })
          : null}
      </div>
    </div>
  );
};

export default Profile;

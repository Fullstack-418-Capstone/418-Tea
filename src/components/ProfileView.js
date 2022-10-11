import React from "react";
import { useState } from "react";
import { getUserByUsername } from "../api";

const Profile = ({ token }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [zipcode, setZipCode] = useState("");

  const HandleChanges = async (event) => {
    event.preventDefault();
    await getUserByUsername();
    setFirstName("");
    setPassword("");
    setAddress("");
    setState("");
    setCity("");
    setZipCode("");
  };

  const HandleOrders = async () => {
    //come and add the function here that will display the orders for the customer
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
          <input
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
            value={state}
            onChange={(event) => {
              setState(event.target.value);
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
          ></input>
          <button> Make Changes </button>
        </form>
      </div>

      <div>
        <h3> Previous Orders </h3>
      </div>
    </div>
  );
};

export default Profile;

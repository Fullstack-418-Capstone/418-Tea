import React from "react";
import { useState } from "react";
import { registerUser } from "../api";
import "./register.css";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipcode, setZipCode] = useState("");

  const HandleSubmit = async (event) => {
    event.preventDefault();

    //console.log line 97 on src index to check address 2

    {
      password == confirmPassword
        ? await registerUser(
            firstName,
            lastName,
            username,
            password,
            confirmPassword,
            email,
            address1,
            city,
            state,
            zipcode
          )
        : alert("passwords do not match");
    }

    {
      password == confirmPassword
        ? await registerUser(
            firstName,
            lastName,
            username,
            password,
            confirmPassword,
            email,
            address1,
            city,
            state,
            zipcode
          )
        : alert("passwords do not match");
    }

    setFirstName("");
    setLastName("");
    setUsername("");
    setPassword("");
    setConfirmPassword("");
    setEmail("");
    setAddress1("");
    setState("");
    setZipCode("");
    setCity("");
    setAddress2("");

    alert("Thank You for Registering!");
  };

  return (
    <div>
      <h1> Welcome, Please Register Here! </h1>
      <form className="form" onSubmit={HandleSubmit}>
        <input
          placeholder="First Name"
          value={firstName}
          type="text"
          onChange={(event) => {
            setFirstName(event.target.value);
          }}
          required
          className="fields"
        ></input>
        <input
          placeholder="Last Name"
          value={lastName}
          type="text"
          onChange={(event) => {
            setLastName(event.target.value);
          }}
          required
          className="fields"
        ></input>
        <input
          placeholder="Create a username"
          value={username}
          type="text"
          onChange={(event) => {
            setUsername(event.target.value);
          }}
          required
          className="fields"
        ></input>
        <input
          placeholder="Create a password"
          value={password}
          type="password"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
          minLength={8}
          required
          className="fields"
        ></input>
        <input
          placeholder="Confirm Password"
          value={confirmPassword}
          type="password"
          onChange={(event) => {
            setConfirmPassword(event.target.value);
          }}
          required
          minLength={8}
          className="fields"
        ></input>
        <input
          placeholder="Please enter email address"
          value={email}
          type="text"
          onChange={(event) => {
            setEmail(event.target.value);
          }}
          required
          className="fields"
        ></input>
        <input
          placeholder="Please enter your address"
          value={address1}
          type="text"
          onChange={(event) => {
            setAddress1(event.target.value);
          }}
          required
          className="fields"
        ></input>
        <input
          placeholder="Please enter your state - 2 Letters"
          value={state}
          type="text"
          onChange={(event) => {
            setState(event.target.value);
          }}
          maxLength={2}
          required
          className="fields"
        ></input>
        <input
          placeholder="Please enter your city"
          value={city}
          type="text"
          onChange={(event) => {
            setCity(event.target.value);
          }}
          required
          className="fields"
        ></input>
        <input
          placeholder="Please enter your zipcode"
          value={zipcode}
          type="number"
          onChange={(event) => {
            setZipCode(event.target.value);
          }}
          maxLength={5}
          required
          className="fields"
        ></input>
        <input
          placeholder="Please enter your address"
          value={address2}
          type="text"
          onChange={(event) => {
            setAddress2(event.target.value);
          }}
          className="fields"
        ></input>
        <button className="register">Register!</button>
      </form>
    </div>
  );
};
export default Register;

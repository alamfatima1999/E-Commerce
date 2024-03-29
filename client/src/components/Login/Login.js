import React, { Component, useState } from "react";
import axios from "axios";
import Customer from "../Customer/Customer";
import AdminContainer from "../Admin/AdminContainer";
import "./Login.css";
import { getBaseUrl } from "../../configuration";

function Login(props) {
  let [uname, setUname] = useState("");
  let [password, setPass] = useState("");
  let [isUserAuthenticated, setUserAuthenticated] = useState(
    sessionStorage.getItem("isUserAuthenticated") === "true" || false
  );
  let [isAdmin, setAdmin] = useState(
    sessionStorage.getItem("isAdmin") === "true" || false
  );
  let [customerId, setCustomerId] = useState(null);

  function handleClick() {
    if (uname && password) {
      const user = {
        email: uname,
        password: password,
      };
      let URL = `${getBaseUrl()}api/user/login`;
      axios
        .post(URL, { ...user })
        .then((res) => {
          console.log(res);
          if (res.data.length > 0) {
            console.log("Logged in successfully");
            setUserAuthenticated(true);
            sessionStorage.setItem("isUserAuthenticated", true);
            const user = res.data[0].isAdmin;
            if (user) {
              setAdmin(true);
            } else {
              setAdmin(false);
              setCustomerId(res.data[0].userId);
              sessionStorage.setItem("customerId", res.data[0].userId);
            }
            sessionStorage.setItem("isAdmin", user ? true : false);
          } else {
            console.log("User not available");
            setUserAuthenticated(false);
          }
        })
        .catch((err) => {
          console.log("error");
          setUserAuthenticated(false);
        });
    } else {
      console.log("Please provide valid data");
    }
  }

  function changeName(event) {
    setUname(event.target.value);
  }

  function changePass(event) {
    setPass(event.target.value);
  }

  return (
    <div class="form-container">
      {!isUserAuthenticated ? (
        <div class="login-container">
          <h1 class="login-title">Login</h1>
          <div class="form-group">
            <label class="form-label">E-Mail</label>
            <input type="text" value={uname} onChange={changeName}></input>
          </div>
          <div class="form-group">
            <label class="form-label">Password</label>
            <input
              type="password"
              value={password}
              onChange={changePass}
            ></input>
          </div>
          <div class="button-container">
            <button class="login-button" onClick={handleClick}>
              Login
            </button>
          </div>
          <div class="new-user" onClick={() => props.navigateToRegisterPage()}>
            Is New User
          </div>
        </div>
      ) : isAdmin ? (
        <AdminContainer />
      ) : (
        <Customer customerId={customerId} />
      )}
    </div>
  );
}

export default Login;

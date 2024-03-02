import React, { Component, useState } from "react";
import axios from "axios";
import Customer from "../Customer/Customer";
import AdminContainer from "../Admin/AdminContainer";

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
      axios
        .post("http://localhost:3001/login", { ...user })
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
              sessionStorage.setItem("customerId", customerId);
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
    <>
      {!isUserAuthenticated ? (
        <>
          <h1>Login</h1>
          <div>
            <label>E-Mail</label>
            <input type="text" value={uname} onChange={changeName}></input>
          </div>
          <div>
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={changePass}
            ></input>
          </div>
          <button onClick={handleClick}>Login</button>
          <div onClick={() => props.navigateToRegisterPage()}>
            {" "}
            Is New User{" "}
          </div>
        </>
      ) : isAdmin ? (
        <AdminContainer />
      ) : (
        <Customer customerId={customerId} />
      )}
    </>
  );
}

export default Login;

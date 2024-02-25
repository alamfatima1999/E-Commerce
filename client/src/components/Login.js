import React, { Component, useState } from "react";
import axios from "axios";

function Login() {
  
  let [uname, setUname] = useState("");
  let [password, setPass] = useState("");
  // let [isRegistered, setReg] = useState(true);

  function handleClick() {
    console.log("Please try again");
    if (uname && password) {
      const user = {
        email: uname,
        password: password,
      };
      axios.post("http://localhost:3001/login", { ...user }).then((res) => {
        console.log(res);
        if(res.data.length>0){
            console.log("Logged in successfully");
        }else{
            console.log("User not available");
        }
      }).catch((err) => console.log("error"));
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
      <h1>Login</h1>
      <div>
        <label>Username</label>
        <input type="text" value={uname} onChange={changeName}></input>
      </div>
      <div>
        <label>Password</label>
        <input type="password" value={password} onChange={changePass}></input>
      </div>
      <button onClick={handleClick}>Login</button>
    </>
  );
}
export default Login;

import React, { Component, useState } from "react";
import Login from "./Login";
import axios from "axios";

function Register() {
  let [email, setEmail] = useState("");
  let [fname, setFname] = useState("");
  let [lname, setLname] = useState("");
  let [pass, setPass] = useState("");
  let [isAdmin, setAdmin] = useState("0");

  const handleUserRegisteration = () => {
    const newUser = {
      email: email,
      password: pass,
      isAdmin: isAdmin,
      fname: fname,
      lname: lname,
    };
    console.log(...newUser);
    // if (email && pass && fname) {
    //   axios
    //     .post("http://localhost:3001/register", { ...newUser })
    //     .then((res) => {
    //       if (res.data.length > 0) console.log("User registered successfully");
    //     })
    //     .catch((err) => console.log("Sorry uable to add ew user"));
    // }else{
    //   console.log("Please fill the required fields");
    // }
  };

  const updateAdmin = (adminValue) => {
    console.log(adminValue);
    setAdmin(adminValue);
  }

  return (
    <>
      <h1>Register</h1>
      <div>
        <label>E-Mail</label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
      </div>
      <div>
        <label>First Name</label>
        <input
          type="text"
          value={fname}
          onChange={(e) => setFname(e.target.value)}
        ></input>
      </div>
      <div>
        <label>Surname</label>
        <input
          type="text"
          value={lname}
          onChange={(e) => setLname(e.target.value)}
        ></input>
      </div>
      <div>
        <label>Password</label>
        <input
          type="text"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        ></input>
      </div>
      <div>
        <input
          type="radio"
          id="pov"
          name="pov"
          // value={isAdmin}
          onChange={() => updateAdmin("0")}
          checked
        ></input>
          <label htmlFor="pov">Customer</label>
        <br></br>
      </div>
      <div>
        <input
          type="radio"
          id="pov"
          name="pov"
          // value={isAdmin}
          onChange={() => updateAdmin("1")}
        ></input>
          <label htmlFor="pov">Admin</label>
        <br />
      </div>
      <div>
        <button onClick={handleUserRegisteration}>Register</button>
      </div>
    </>
  );
}

export default Register;

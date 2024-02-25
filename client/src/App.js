import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  let [user, setUser] = useState(false);
  let [isRegistered, setRegisteredUser] = useState(true);
  // let [isRegisteredUser, setIsRegisteredUser] = useState(true);

  const updateUserChoice = () => {
    setRegisteredUser(!isRegistered);
  }


  return (
    <>
      <div>{isRegistered ? <Login /> : <Register />}</div>
      {/* <div>{isRegistered? <button onClick={handleReg}>New user?</button>: <button onClick={handleLogin}>Register</button>}</div> */}
      <div>
        {isRegistered  ? <div onClick={()=>updateUserChoice()}> Is New User </div> : <div onClick={()=>updateUserChoice()}> Already Registered User </div>}
      </div>
    </>
  );
}

export default App;

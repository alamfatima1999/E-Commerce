import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";

function App() {
  let [user, setUser] = useState(false);
  let [isRegistered, setRegisteredUser] = useState(true);

  const navigateToLoginPage = () => {
    setRegisteredUser(true);
  };
  const navigateToRegisterPage = () => {
    setRegisteredUser(false);
  };
  return (
    <>
      <div>
        {isRegistered ? (
          <Login navigateToRegisterPage={navigateToRegisterPage} />
        ) : (
          <Register navigateToLoginPage={navigateToLoginPage} />
        )}
      </div>
    </>
  );
}

export default App;

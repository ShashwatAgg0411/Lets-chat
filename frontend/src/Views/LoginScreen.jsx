import React, { useState } from "react";
import Login from "../Components/Login";
import Signup from "../Components/Signup";

function LoginScreen({ setToken }) {
  const [landingPage, setLandingPage] = useState("login");
  return (
    <div>
      {landingPage === "login" && (
        <Login setLandingPage={setLandingPage} setToken={setToken} />
      )}
      {landingPage === "signup" && <Signup setLandingPage={setLandingPage} />}
    </div>
  );
}

export default LoginScreen;

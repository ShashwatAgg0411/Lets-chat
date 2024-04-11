import "./App.css";
import LoginScreen from "./Views/LoginScreen";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {Routes, Route, Navigate} from "react-router-dom"
import ChatScreen from "./Views/ChatScreen";
import { useEffect, useState } from "react";

function App() {
  const [token, setToken] = useState(null)
  useEffect(() => {
    let token1 = localStorage.getItem("token");
    setToken(token1)
  },[])
  function isAuthorize() {
    return !!token;
  }
  return (
    <>
      <ToastContainer autoClose={3000} />

      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              isAuthorize() ? (
                <Navigate to="/home" replace />
              ) : (
                <LoginScreen setToken={setToken} />
              )
            }
          ></Route>
          <Route
            path="/home"
            element={
              isAuthorize() ? <ChatScreen setToken={setToken} /> : <Navigate to="/" replace />
            }
          ></Route>
        </Routes>
      </div>
    </>
  );
}

export default App;

import React, { useState } from "react";
import workinglady from "../assets/workinglady.png";
import cactus from "../assets/cactus.png";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Signup({ setLandingPage }) {
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let name = formState.name;
    let password = formState.password;
    let email = formState.email;
    if (!name || !password || !email) {
      toast.error("please enter all the fields", {
        position: "top-right",
      });
    } else {
      // console.log("name", name);
      // console.log("password", password);
      // console.log("email", email);
      try {
        let res = await axios.post(
          "https://lets-chat-5ou7.onrender.com/user/signup",
          {
            name,
            email,
            password,
          }
        );
        // console.log(res);
        localStorage.setItem("token", res.data.token)
        localStorage.setItem("user", JSON.stringify(res.data.user))

        toast.success("User Registered successfully", {
          position: "top-right",
        });
        navigate("/home");
      } catch (err) {
        console.log(err);
        toast.error(err.response.data.message, {
          position: "top-right",
        });
      }

      setFormState({
        name: "",
        email: "",
        password: "",
      });
    }
  };
  return (
    <div className=" relative w-full h-screen bg-gradient-to-r from-[#0083b05d] to-[#db009e53] flex items-center justify-center">
      <div className=" relative w-[75%] h-[80%]  bg-white rounded-3xl flex ">
        <div className="absolute bottom-10  left-[50%] md:left-[45%]  z-10  h-[75%] w-[40%] overflow-hidden scale-125 hidden sm:flex ">
          <img src={workinglady} alt="working lady" className="z-30 w-[95%]" />
          <img
            src={cactus}
            alt="cactus"
            className="z-20 w-[35%] -ml-[30%] scale-[0.8] "
          />
        </div>
        {/* <div className="absolute bottom-2 z-10 flex h-[85%] w-fit  "> */}
        {/* </div> */}

        <div className=" w-[100%] sm:w-[68%] h-full rounded-3xl pt-10  pb-5 px-5 sm:px-10 flex flex-col gap-4">
          <p className="text-[#D885A3] text-4xl font-bold px-2">Let's Chat</p>
          <div className=" signupcontainer w-[100%] sm:w-[90%] md:w-[60%] xl:w-[55%] flex flex-col gap-5 overflow-y-scroll px-2">
            <p className="font-bold text-xl mt-3">SignUp</p>
            <form
              onSubmit={(e) => {
                handleSubmit(e);
              }}
              className="flex flex-col gap-4"
            >
              <div className="flex flex-col gap-1 ">
                <label
                  className="text-sm font-semibold opacity-60"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  // className=" border-blue-200 px-2 py-1 rounded-md w-1/2 text-lg bg-[#C0DBEA] bg-opacity-50"
                  className=" w-full px-6 py-2 rounded-lg font-medium bg-[#C0DBEA]  bg-opacity-40 border border-blue-300 placeholder-gray-400 text-md focus:outline-none focus:border-blue-400 focus:bg-white focus:ring-1 focus:shadow-[0_0px_10px_5px_#bfdbfe]"
                  placeholder="Name"
                  id="name"
                  name="name"
                  value={formState.name}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                ></input>
              </div>
              <div className="flex flex-col gap-1 ">
                <label
                  className="text-sm font-semibold opacity-60"
                  htmlFor="email"
                >
                  Email id
                </label>
                <input
                  // className=" focus:outline-blue-500 focus:ring-1 border focus:border-blue-500 px-2 py-1   rounded-lg w-1/2 text-lg bg-[#C0DBEA] bg-opacity-50"
                  className=" w-full px-6 py-2 rounded-lg font-medium bg-[#C0DBEA]  bg-opacity-40 border border-blue-300 placeholder-gray-400 text-md focus:outline-none focus:border-blue-400 focus:bg-white focus:ring-1 focus:shadow-[0_0px_10px_5px_#bfdbfe]"
                  placeholder="Email Id"
                  id="email"
                  name="email"
                  value={formState.email}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                ></input>
              </div>
              <div className="flex flex-col gap-1 ">
                <label
                  className="text-sm font-semibold opacity-60"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  // className=" focus:outline-blue-500 focus:ring-1 border focus:border-blue-500 px-2 py-1   rounded-lg w-1/2 text-lg bg-[#C0DBEA] bg-opacity-50"
                  className=" w-full px-6 py-2 rounded-lg font-medium bg-[#C0DBEA]  bg-opacity-40 border border-blue-300 placeholder-gray-400 text-md focus:outline-none focus:border-blue-400 focus:bg-white focus:ring-1 focus:shadow-[0_0px_10px_5px_#bfdbfe]"
                  placeholder="Password"
                  id="password"
                  name="password"
                  value={formState.password}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                ></input>
              </div>
              <div className="flex justify-center items-center mt-4">
                <button
                  type="submit"
                  className="px-6 py-[6px] rounded-full bg-[#D885A3] bg-opacity-90 text-white font-semibold flex gap-2"
                >
                  <p>Signup</p>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3.56249 13.4062H17.7469L14.3648 9.11719C14.2687 8.99531 14.3555 8.8125 14.5125 8.8125H16.0312C16.2609 8.8125 16.4789 8.91797 16.6195 9.09844L20.4633 13.9734C20.85 14.4656 20.5008 15.1875 19.875 15.1875H3.56249C3.45936 15.1875 3.37499 15.1031 3.37499 15V13.5938C3.37499 13.4906 3.45936 13.4062 3.56249 13.4062Z"
                      fill="white"
                    />
                  </svg>
                </button>
              </div>
              <div className="flex gap-1 justify-center items-center">
                <p className="text-xs font-medium opacity-50">
                  Already an User?
                </p>
                <p
                  onClick={() => {
                    setLandingPage("login");
                  }}
                  className="text-xs font-medium text-[#D885A3] underline cursor-pointer"
                >
                  Login
                </p>
              </div>
            </form>
            {/* <div className="flex gap-1 justify-center items-center">
              <p className="text-xs font-medium opacity-50">Already an User?</p>
              <p
                onClick={() => {
                  setLandingPage("login");
                }}
                className="text-xs font-medium text-[#D885A3] underline cursor-pointer"
              >
                Login
              </p>
            </div> */}
          </div>
        </div>
        <div className="absolute w-[32%] h-full right-0 bg-[#C0DBEA] bg-opacity-90  rounded-3xl hidden sm:block"></div>
      </div>
    </div>
  );
}

export default Signup;

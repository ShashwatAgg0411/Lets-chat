import React, { useState } from "react";
import Profile from "../assets/profile.png";
import Home from "../assets/home.png";
import NotificationIcon from "../assets/notifications.png";
import Message from "../assets/messages.png";
import Logout from "../assets/logout.png";
import { useNavigate } from "react-router-dom";
// import Notification from "./Notification";
import NotificationBlock from "./NotificationBlock";

function LeftPanel({
  setToken,
  selectedChat,
  setSelectedChat,
  allNotifications,
  setAllNotifications,
}) {
  const navigate = useNavigate();
  const [showNotification, setShowNotification] = useState(false);
  return (
    <div className="w-[15%] sm:w-[6%] xl:w-[5%]   h-[100%] bg-[#6E00FF] rounded-xl ">
      <div className="h-[100%] flex flex-col justify-between items-center py-2">
        <div className="flex items-center justify-center">
          <img
            src={Profile}
            alt="profile"
            className=" w-7 h-7 min-[450px]:w-9 min-[450px]:h-9 lg:w-11 lg:h-11"
          ></img>
        </div>

        <div className="flex flex-col items-center justify-center gap-6 w-full">
          {/* { selectedChat && */}
          <div
            onClick={() => {
              setSelectedChat(null);
            }}
            className={` ${
              selectedChat
                ? ""
                : "bg-[#612DD1] bg-opacity-90 border-r-4 border-[#F3B559]"
            } flex  w-full py-2 items-center justify-center cursor-pointer hover:bg-[#612DD1] hover:bg-opacity-90`}
          >
            <img
              src={Home}
              alt="home"
              className="  w-6 h-6 min-[450px]:w-8 min-[450px]:h-8 lg:w-10 lg:h-10"
            ></img>
          </div>
          {/* } */}
          <div
            className={`flex w-full py-2 items-center justify-center   ${
              selectedChat
                ? "bg-[#612DD1] bg-opacity-90 border-r-4 border-[#F3B559]"
                : ""
            }`}
          >
            <img
              src={Message}
              alt="message"
              className="w-5 h-5 min-[450px]:w-7 min-[450px]:h-7 lg:w-8 lg:h-8"
            ></img>
          </div>
          <div
            onClick={() => {
              setShowNotification(!showNotification);
            }}
            className={`flex relative w-full py-2 items-center justify-center  hover:bg-[#612DD1] hover:bg-opacity-90 ${
              showNotification ? "border-r-4 border-[#F3B559]" : ""
            } `}
          >
            {showNotification && (
              <NotificationBlock
                showNotification={showNotification}
                setShowNotification={setShowNotification}
                allNotifications={allNotifications}
                setAllNotifications={setAllNotifications}
                setSelectedChat={setSelectedChat}
              />
            )}

            <div
              className={`scale-0 ${
                allNotifications.length > 0 ? "scale-100" : ""
              }   transition-all duration-100 absolute w-[25%] h-[25%] rounded-full bg-red-500 top-1 right-1 text-[9px] flex justify-center items-center text-white `}
            >
              <p className=" -translate-x-[25%] ">{allNotifications.length}</p>
            </div>

            <img
              src={NotificationIcon}
              alt="notification"
              className=" w-6 h-6 min-[450px]:w-8 min-[450px]:h-8 lg:w-10 lg:h-10 cursor-pointer"
            ></img>
          </div>
        </div>

        <div
          onClick={() => {
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            setToken(null);

            // socket.disconnect()
            navigate("/");
          }}
          className="flex  w-full py-2 items-center justify-center  cursor-pointer hover:bg-[#612DD1] hover:bg-opacity-90 active:border-r-4 active:border-[#F3B559]"
        >
          <img
            src={Logout}
            alt="profile"
            className="w-6 h-6 min-[450px]:w-8 min-[450px]:h-8   lg:w-10 lg:h-10"
          ></img>
        </div>
      </div>
    </div>
  );
}

export default LeftPanel;

import React from "react";
import Profile from "../assets/profile.png";
import moment from "moment";

function ChatBlock({ c,selectedChat, setSelectedChat }) {
  const getChatName = (c) => {
    const cuser = JSON.parse(localStorage.getItem("user"))
    if (c.isGroupChat) {
      return c.name;
    } else {
      let arr = c.users

      if (arr[0]._id === cuser._id) {
        return arr[1].name
      } else {
        return arr[0].name
      }
    }
  };

  return (
    <div
      onClick={() => {
        setSelectedChat(c);
      }}
      className={`w-full h-fit   rounded-3xl p-2 cursor-pointer ${
        selectedChat && selectedChat._id === c._id ? "bg-sky-100" : ""
      }  `}
    >
      <div className={`flex gap-3 items-center `}>
        {c.isGroupChat ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="fill-black opacity-70 w-8 h-8 "
          >
            <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3s1.34 3 3 3m-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5S5 6.34 5 8s1.34 3 3 3m0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5m8 0c-.29 0-.62.02-.97.05c1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5" />
          </svg>
        ) : (
          <img
            src={`https://api.dicebear.com/8.x/initials/svg?seed=${getChatName(
              c
            )}&radius=50&scale=90`}
            alt="profile"
            className="w-8 h-8  "
          ></img>
        )}
        {/* <img src={Profile} alt="profile" className="w-8 h-8 "></img> */}
        <div className="w-full overflow-x-hidden">
          <p className=" text-sm sm:text-xs md:text-sm font-medium line-clamp-1 text-ellipsis">
            {getChatName(c)}
          </p>
          {c.messages.length > 0 && (
            <div className="flex w-full justify-between items-center">
              <p className=" text-xs sm:text-[10px] md:text-xs line-clamp-1 text-ellipsis">
                {c.messages[c.messages.length - 1].content}
              </p>
              <p className=" text-[10px] sm:text-[9px] md:text-[10px] opacity-50 ">
                {moment(
                  c.messages[c.messages.length - 1].updatedAt,
                  moment.DATETIME_LOCAL_MS
                ).format("D MMM, H:mm")}
              </p>
            </div>
          )}
        </div>
      </div>

      <hr
        className={`mt-1 ${
          selectedChat && selectedChat._id === c._id ? "invisible" : ""
        } `}
      />
    </div>
  );
}

export default ChatBlock;

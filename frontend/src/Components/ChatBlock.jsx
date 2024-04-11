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
        <img src={Profile} alt="profile" className="w-8 h-8 "></img>
        <div className="w-full">
          <p className="text-sm font-medium line-clamp-1">{getChatName(c)}</p>
          {c.messages.length > 0 && (
            <div className="flex w-full justify-between items-center">
              <p className="text-xs line-clamp-1">
                {c.messages[c.messages.length - 1].content}
              </p>
              <p className=" text-[10px] ">
                {moment(
                  c.messages[c.messages.length - 1].updatedAt,
                  moment.DATETIME_LOCAL_MS
                ).format("D MMM, h:mm a")}
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

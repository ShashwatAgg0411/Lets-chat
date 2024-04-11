import React from "react";
import Profile from "../assets/profile.png";
import axios from "axios";
import { toast } from "react-toastify";
function SearchChatBlock({
  c,
  setSelectedChat,
  allChats,
  setAllChats,
  setSearchChats,
}) {
  const handleClick = async (c) => {
    let user = JSON.parse(localStorage.getItem("user"));
    let cid = user._id;
    let uid = c._id;

    if (!cid || !uid) {
      toast.error("Incomplete details", {
        position: "top-right",
      });
    } else {
      try {
        let res = await axios.post(
          "https://lets-chat-5ou7.onrender.com/chat/getorCreateChat",
          {
            cid,
            uid,
          }
        );
        // console.log("res in search block", res);
        // console.log(res.data);
        let chatextracted = res.data;
        let r = allChats.filter((ch) => ch._id === chatextracted._id);
        if (r.length == 0) {
          setAllChats([chatextracted, ...allChats]);
        }
          setSelectedChat(res.data);
          setSearchChats([])
      } catch (err) {
        toast.error(err.response.data.message, {
          position: "top-right",
        });
        console.log(err);
      }
    }
  };
  return (
    <div
      onClick={() => {
        handleClick(c);
      }}
      className="w-full h-fit   rounded-xl p-2 cursor-pointer "
    >
      <div className="flex gap-3 items-center">
        <img src={Profile} alt="profile" className="w-8 h-8 "></img>
        <div>
          <p className="text-sm font-medium line-clamp-1">{c.name}</p>
        </div>
      </div>
      <hr className="mt-1 " />
    </div>
  );
}

export default SearchChatBlock;

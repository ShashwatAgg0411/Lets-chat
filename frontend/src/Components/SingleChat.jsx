import React, { useRef, useEffect, useState } from "react";
import Profile from "../assets/profile.png";
import Message from "./Message";
import axios from "axios";
import { toast } from "react-toastify";
import io from "socket.io-client";

const ENDPOINT = "https://lets-chat-5ou7.onrender.com/";
var socket, selectedChatCompare;

function SingleChat({
  selectedChat,
  setSelectedChat,
  fetchAllChats,
  allNotifications,
  setAllNotifications,
}) {
  const [allMessages, setAllMessages] = useState([]);
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );
  const [inputMessage, setInputMessage] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);

  const divRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", currentUser);
    socket.on("connected", () => setSocketConnected(true));

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    // Scroll to bottom on page load
    if (divRef && divRef.current) {
      divRef.current.scrollTop = divRef.current.scrollHeight;
    }
    if (inputRef && inputRef.current) {
      inputRef.current.focus();
    }
  }, [selectedChat, allMessages]);

  useEffect(() => {
      selectedChatCompare = selectedChat;
    
    if (selectedChat) {
      fetchAllMessages();
      // console.log("currentuser" ,currentUser)
    }
  }, [selectedChat]);

  useEffect(() => {
    // if (socket) {
    socket.on("new message recieved", (msgs) => {
      let newMessage = msgs.newMessage;
      // console.log(newMessage);
      var chat = msgs.chat;
      // console.log("chat in new msg", chat)

      if (!selectedChatCompare || selectedChatCompare._id !== chat._id || (selectedChat &&selectedChat._id!==chat._id)) {
        if (!allNotifications.includes(msgs)) {
          setAllNotifications([msgs, ...allNotifications])
        }
        //notification logic
      } else {
        setAllMessages([...allMessages, newMessage]);
      }
      fetchAllChats();
    });
    // }
  });


  const fetchAllMessages = async () => {
    let res = await axios.get(
      `https://lets-chat-5ou7.onrender.com/chat/getAllMessages/${selectedChat._id}`
    );
    // console.log(res.data);
    setAllMessages(res.data);
    // if (socket) {
    socket.emit("join chat", selectedChat._id);
    // }
  };

  const sendMessage = async (e) => {
    e.preventDefault();

    if (!inputMessage || !selectedChat || !currentUser) {
      toast.error("please enter a message to send", {
        position: "top-right",
      });
    } else {
      try {
        setInputMessage("");
        let res = await axios.post(
          "https://lets-chat-5ou7.onrender.com/message/send",
          {
            sender_id: currentUser._id,
            content: inputMessage,
            chat_id: selectedChat._id,
          }
        );
        // console.log("message sent", res.data);
        // if (socket) {
        socket.emit("new message", {
          newMessage: res.data,
          chat: selectedChat,
        });
        // }
        fetchAllChats();
        setAllMessages([...allMessages, res.data]);
      } catch (err) {
        console.log(err);
        toast.error(err.response.data.message, {
          position: "top-right",
        });
      }
    }
  };

  const getChatName = (c) => {
    const cuser = JSON.parse(localStorage.getItem("user"));

    if (c.isGroupChat) {
      return c.name;
    } else {
      let arr = c.users;
      if (arr[0]._id === cuser._id) {
        return arr[1].name;
      } else {
        return arr[0].name;
      }
    }
  };

  return (
    <>
      {!selectedChat && (
        <div className=" relative h-[100%] w-[65%] flex flex-col  rounded-xl shadow-[0_0px_10px_5px_#bfdbfe] px-3 py-3 bg-white  ">
          please select a chat
        </div>
      )}
      {selectedChat && (
        <div className=" relative h-[100%] w-[65%] flex flex-col  rounded-xl shadow-[0_0px_10px_5px_#bfdbfe] px-3 py-3 bg-white  ">
          <div className="w-full h-fit rounded-t-xl px-2 ">
            <div className="flex gap-4 items-center ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                // width="1em"
                // height="1em"
                viewBox="0 0 24 24"
                className="w-6 h-6 mr-2 cursor-pointer"
                onClick={() => setSelectedChat(null)}
              >
                <path
                  fill="black"
                  d="m4 10l-.707.707L2.586 10l.707-.707zm17 8a1 1 0 1 1-2 0zM8.293 15.707l-5-5l1.414-1.414l5 5zm-5-6.414l5-5l1.414 1.414l-5 5zM4 9h10v2H4zm17 7v2h-2v-2zm-7-7a7 7 0 0 1 7 7h-2a5 5 0 0 0-5-5z"
                />
              </svg>
              <img src={Profile} alt="profile" className="w-10 h-10"></img>
              <p className="text-lg font-medium">
                {selectedChat.isGroupChat
                  ? selectedChat.name
                  : getChatName(selectedChat)}
              </p>
            </div>
            <hr className="mt-2 border-t border-black border-opacity-30 solid" />
          </div>

          <div
            ref={divRef}
            className=" signupcontainer chatContainer  w-[100%] h-[100%] overflow-y-scroll px-2 flex flex-col gap-1 pt-3 pb-3"
          >
            {allMessages &&
              allMessages.map((msg, idx) => (
                <Message
                  key={idx}
                  isSentbyOwner={msg.sender._id === currentUser._id}
                  message={msg.content}
                  time={msg.updatedAt}
                />
              ))}
          </div>

          <div className="w-[100%] h-fit px-2 rounded-xl  ">
            <form onSubmit={sendMessage}>
              <div className="flex flex-col gap-1 flex-wrap ">
                <input
                  // className=" border-blue-200 px-2 py-1 rounded-md w-1/2 text-lg bg-[#C0DBEA] bg-opacity-50"
                  ref={inputRef}
                  className=" active max-w-full flex flex-wrap px-6 py-2 rounded-lg font-medium bg-sky-50  bg-opacity-40 border border-blue-300 placeholder-gray-400 text-md focus:outline-none focus:border-blue-400 focus:bg-white focus:ring-1 focus:shadow-[0_0px_10px_5px_#bfdbfe]"
                  placeholder="Enter a Message"
                  id="message"
                  name="message"
                  value={inputMessage}
                  // autoFocus={true}
                  onChange={(e) => {
                    setInputMessage(e.target.value);
                  }}
                ></input>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default SingleChat;

import React, { useRef, useEffect, useState } from "react";
import Profile from "../assets/profile.png";
import Message from "./Message";
import axios from "axios";
import { toast } from "react-toastify";
import moment from "moment";
import io from "socket.io-client";

// const ENDPOINT = "https://lets-chat-5ou7.onrender.com/";
// const ENDPOINT_LOCAL = "http://localhost:3001/";
// var socket, selectedChatCompare;


function GroupDetailsUserBlock({u}) {
  

  return (
    <div className="w-full h-fit   rounded-xl py-2">
      <div className="flex gap-3 items-center">
        <img
          src={`https://api.dicebear.com/8.x/initials/svg?seed=${u.name}&radius=50&scale=90`}
          alt="profile"
          className="w-8 h-8 "
        ></img>
        <div>
          <p className=" text-base   line-clamp-1">{u.name}</p>
        </div>
      </div>
      <hr className="mt-1 " />
    </div>
  );
}

function SingleChat({
  selectedChat,
  setSelectedChat,
  fetchAllChats,
  allNotifications,
  setAllNotifications,
  allMessages,
  setAllMessages,
  socket,
  selectedChatCompare,
  fetchAllMessages,
}) {
  // const [allMessages, setAllMessages] = useState([]);
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );
  const [inputMessage, setInputMessage] = useState("");
  // const [socketConnected, setSocketConnected] = useState(false);
  const [showChatInfo, setShowChatInfo] = useState(false);

  const divRef = useRef(null);
  const inputRef = useRef(null);

  // useEffect(() => {
  //   socket = io(
  //     process.env.REACT_APP_NODE_ENV === "production"
  //       ? ENDPOINT
  //       : ENDPOINT_LOCAL
  //   );
  //   socket.emit("setup", currentUser);
  //   socket.on("connected", () => setSocketConnected(true));

  //   return () => {
  //     socket.disconnect();
  //   };
  // }, []);

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
    setShowChatInfo(false);
  }, [selectedChat]);

  // useEffect(() => {
  //     selectedChatCompare = selectedChat;

  //   if (selectedChat) {
  //     fetchAllMessages();
  //     // console.log("currentuser" ,currentUser)
  //   }
  // }, [selectedChat]);

  // useEffect(() => {
  //   // if (socket) {
  //   socket.on("new message recieved", (msgs) => {
  //     let newMessage = msgs.newMessage;
  //     // console.log(newMessage);
  //     var chat = msgs.chat;
  //     // console.log("chat in new msg", chat)

  //     if (!selectedChatCompare || selectedChatCompare._id !== chat._id || (selectedChat &&selectedChat._id!==chat._id)) {
  //       if (!allNotifications.includes(msgs)) {
  //         setAllNotifications([msgs, ...allNotifications])
  //       }
  //       //notification logic
  //     } else {
  //       setAllMessages([...allMessages, newMessage]);
  //     }
  //     fetchAllChats();
  //   });
  //   // }
  // });

  // const fetchAllMessages = async () => {
  //   let res = await axios.get(
  //     process.env.REACT_APP_NODE_ENV === "production"
  //       ? `https://lets-chat-5ou7.onrender.com/chat/getAllMessages/${selectedChat._id}`
  //       : `http://localhost:3001/chat/getAllMessages/${selectedChat._id}`
  //   );
  //   // console.log(res.data);
  //   setAllMessages(res.data);
  //   // if (socket) {
  //   socket.emit("join chat", selectedChat._id);
  //   // }
  // };

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
          process.env.REACT_APP_NODE_ENV === "production"
            ? "https://lets-chat-5ou7.onrender.com/message/send"
            : "http://localhost:3001/message/send",
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
        <div
          className={`${
            selectedChat ? "flex" : " hidden sm:flex"
          } relative h-[100%] w-[85%] sm:w-[60%] xl:w-[65%] flex flex-col items-center justify-center  rounded-xl shadow-[0_0px_10px_5px_#bfdbfe] px-3 py-3 bg-white  `}
        >
          please select a chat
        </div>
      )}
      {selectedChat && (
        <div
          className={` ${
            selectedChat ? "flex" : " hidden sm:flex"
          } relative h-[100%] w-[85%] min-[425px]:w-[80%] sm:w-[60%] xl:w-[65%]  flex-col  rounded-xl shadow-[0_0px_10px_5px_#bfdbfe] px-2 sm:px-3 py-3 bg-white  `}
        >
          {showChatInfo && (
            <div className="absolute w-full h-full flex justify-center items-center z-30">
              <div className="w-full md:w-[90%] lg:w-[70%] xl:w-[60%] max-h-[60%] bg-white flex flex-col gap-3  py-2 px-4 border border-slate-300 rounded-xl  shadow-[0_0px_15px_5px_#bfdbfe]">
                <div className="relative flex  flex-col gap-1 pb-2 w-full h-fit items-center border-b border-black border-opacity-25">
                  <p className=" text-xl font-semibold">{selectedChat.name}</p>
                  <p className=" text-sm text-center">{`~ Created by ${
                    selectedChat.admin_id.name
                  } on ${moment(
                    selectedChat.createdAt,
                    moment.DATETIME_LOCAL_MS
                  ).format("D MMM, h:mm a")}`}</p>
                  <div className="absolute top-0 right-0  flex justify-center items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      // width="1em"
                      // height="1em"
                      viewBox="0 0 16 16"
                      className="w-8 h-8 cursor-pointer "
                      onClick={() => {
                        setShowChatInfo(false);
                      }}
                    >
                      <path
                        fill="none"
                        stroke="red"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="m11.25 4.75l-6.5 6.5m0-6.5l6.5 6.5"
                      />
                    </svg>
                  </div>
                </div>
                <div className="flex flex-col items-start px-2 overflow-y-scroll signupcontainer">
                  <p className="text-lg mb-2 font-medium sticky top-0 bg-white w-full">
                    Group Members
                  </p>
                  {selectedChat.users.map((u) => (
                    <GroupDetailsUserBlock u={u} />
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className=" w-full h-fit rounded-t-xl px-2 ">
            <div className="flex justify-between items-center w-full">
              <div className="flex gap-3 sm:gap-4 items-center ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  // width="1em"
                  // height="1em"
                  viewBox="0 0 24 24"
                  className=" w-4 h-4 sm:w-6 sm:h-6 mr-2 cursor-pointer"
                  onClick={() => setSelectedChat(null)}
                >
                  <path
                    fill="black"
                    d="m4 10l-.707.707L2.586 10l.707-.707zm17 8a1 1 0 1 1-2 0zM8.293 15.707l-5-5l1.414-1.414l5 5zm-5-6.414l5-5l1.414 1.414l-5 5zM4 9h10v2H4zm17 7v2h-2v-2zm-7-7a7 7 0 0 1 7 7h-2a5 5 0 0 0-5-5z"
                  />
                </svg>
                {
                  selectedChat.isGroupChat ? <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" className="fill-black opacity-70 scale-95 w-7 h-7 sm:w-8 sm:h-8 xl:w-10 xl:h-10 ">
                    <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3s1.34 3 3 3m-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5S5 6.34 5 8s1.34 3 3 3m0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5m8 0c-.29 0-.62.02-.97.05c1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5" />
                  </svg>:
                <img
                  src={
                      `https://api.dicebear.com/8.x/initials/svg?seed=${getChatName(
                          selectedChat
                        )}&radius=50&scale=90`
                  }
                  alt="profile"
                  className="w-7 h-7 sm:w-8 sm:h-8 xl:w-10 xl:h-10 scale-95"
                ></img>}
              

                <p className=" text-sm min-[450px]:text-base sm:text-lg font-medium">
                  {selectedChat.isGroupChat
                    ? selectedChat.name
                    : getChatName(selectedChat)}
                </p>
              </div>
              {selectedChat.isGroupChat && (
                <div className="flex justify-center items-center w-fit h-full mr-4 ">
                  <svg
                    onClick={() => setShowChatInfo(true)}
                    xmlns="http://www.w3.org/2000/svg"
                    // width="1em"
                    // height="1em"
                    viewBox="0 0 32 32"
                    className=" rounded-full w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 cursor-pointer hover:scale-110 transition-all duration-100 ease-in hover:shadow-[0_0px_15px_2px_#bfdbfe] "
                  >
                    <path
                      fill="black"
                      d="M30.94 15.66A16.69 16.69 0 0 0 16 5A16.69 16.69 0 0 0 1.06 15.66a1 1 0 0 0 0 .68A16.69 16.69 0 0 0 16 27a16.69 16.69 0 0 0 14.94-10.66a1 1 0 0 0 0-.68M16 25c-5.3 0-10.9-3.93-12.93-9C5.1 10.93 10.7 7 16 7s10.9 3.93 12.93 9C26.9 21.07 21.3 25 16 25"
                    />
                    <path
                      fill="black"
                      d="M16 10a6 6 0 1 0 6 6a6 6 0 0 0-6-6m0 10a4 4 0 1 1 4-4a4 4 0 0 1-4 4"
                    />
                  </svg>
                </div>
              )}
            </div>
            <hr className="mt-2 border-t border-black border-opacity-30 solid" />
          </div>

          <div
            ref={divRef}
            className=" signupcontainer chatContainer  w-[100%] h-[100%] overflow-y-scroll px-2 flex flex-col gap-2 pt-3 pb-3"
          >
            {allMessages &&
              allMessages.map((msg, idx) => (
                <Message
                  key={idx}
                  // isSentbyOwner={msg.sender._id === currentUser._id}
                  // message={msg.content}
                  // time={msg.updatedAt}
                  msg={msg}
                  isGroup={selectedChat.isGroupChat}
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

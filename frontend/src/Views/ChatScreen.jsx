import React , {useState, useEffect} from 'react'
import LeftPanel from '../Components/LeftPanel'
import AllChats from '../Components/AllChats'
import SingleChat from '../Components/SingleChat'
import axios from "axios"
import { toast } from "react-toastify"
import io from "socket.io-client";


const ENDPOINT = "https://lets-chat-5ou7.onrender.com/";
const ENDPOINT_LOCAL = "http://localhost:3001/";
var socket, selectedChatCompare;

function ChatScreen({setToken}) {
  const [selectedChat, setSelectedChat] = useState(null);
  const [allChats, setAllChats] = useState([]);
  const [allNotifications, setAllNotifications] = useState([])
  const [allMessages, setAllMessages] = useState([]);
  const [socketConnected, setSocketConnected] = useState(false);
    const [currentUser, setCurrentUser] = useState(
      JSON.parse(localStorage.getItem("user"))
    );


    useEffect(() => {
      socket = io(
        process.env.REACT_APP_NODE_ENV === "production"
          ? ENDPOINT
          : ENDPOINT_LOCAL
      );
      socket.emit("setup", currentUser);
      socket.on("connected", () => setSocketConnected(true));

      return () => {
        socket.disconnect();
      };
    }, []);
  
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

        if (
          !selectedChatCompare ||
          selectedChatCompare._id !== chat._id ||
          (selectedChat && selectedChat._id !== chat._id)
        ) {
          if (!allNotifications.includes(msgs)) {
            setAllNotifications([msgs, ...allNotifications]);
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
        process.env.REACT_APP_NODE_ENV === "production"
          ? `https://lets-chat-5ou7.onrender.com/chat/getAllMessages/${selectedChat._id}`
          : `http://localhost:3001/chat/getAllMessages/${selectedChat._id}`
      );
      // console.log(res.data);
      setAllMessages(res.data);
      // if (socket) {
      socket.emit("join chat", selectedChat._id);
      // }
    };

  
  // const [socketConnected, setSocketConnected] = useState(false);
  //   const [currentUser, setCurrentUser] = useState(
  //     JSON.parse(localStorage.getItem("user"))
  // );
  // const ENDPOINT = "http://localhost:3001";
  
  // const [socket, setSocket] = useState(io(ENDPOINT));


  // var socket, selectedChatCompare;
  // var selectedChatCompare;

  // useEffect(() => {
  //   // socket = io(ENDPOINT);
  //   // setSocket(io(ENDPOINT))
  //   socket.emit("setup", currentUser);
  //   socket.on("connected", () => setSocketConnected(true));
  // }, []);

  const fetchAllChats = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    let cid = user._id;

    try {
      let res = await axios.post(
        `${
          process.env.REACT_APP_NODE_ENV === "production"
            ? "https://lets-chat-5ou7.onrender.com/chat/allChats"
            : "http://localhost:3001/chat/allchats"
        }`,
        {
          cid,
        }
      );

      // console.log("all chats", res);
      setAllChats(res.data);
    } catch (err) {
      // console.log(err);
      toast.error(err.response.data.message, {
        position: "top-right",
      });
    }
  };

  return (
    //   <div className='flex'>
    <div className=" relative w-full h-screen bg-gradient-to-r from-[#0083b05d] to-[#db009e53] flex items-center justify-center">
      <div className=" relative w-[90%] xl:w-[85%] h-[90%] bg-[#EFF6FC]   rounded-3xl flex  justify-between p-5 ">
        <LeftPanel
          setToken={setToken}
          selectedChat={selectedChat}
          setSelectedChat={setSelectedChat}
          allNotifications={allNotifications}
          setAllNotifications={setAllNotifications}
        />
        <AllChats
          selectedChat={selectedChat}
          setSelectedChat={setSelectedChat}
          allChats={allChats}
          setAllChats={setAllChats}
          fetchAllChats={fetchAllChats}
        />
        <SingleChat
          selectedChat={selectedChat}
          setSelectedChat={setSelectedChat}
          // allChats={allChats}
          // setAllChats={setAllChats}
          fetchAllChats={fetchAllChats}
          allNotifications={allNotifications}
          setAllNotifications={setAllNotifications}
          allMessages={allMessages}
          setAllMessages={setAllMessages}
          socket={socket}
          selectedChatCompare={selectedChatCompare}
          fetchAllMessages={fetchAllMessages}
          // currentUser={currentUser}
          // setCurrentUser={setCurrentUser}
        />
      </div>
    </div>
  );
}

export default ChatScreen
import React , {useState, useEffect} from 'react'
import LeftPanel from '../Components/LeftPanel'
import AllChats from '../Components/AllChats'
import SingleChat from '../Components/SingleChat'
import axios from "axios"
import { toast } from "react-toastify"
import io from "socket.io-client";


function ChatScreen({setToken}) {
  const [selectedChat, setSelectedChat] = useState(null);
  const [allChats, setAllChats] = useState([]);
  const[allNotifications, setAllNotifications] = useState([])
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
        "https://lets-chat-5ou7.onrender.com/chat/allChats",
        {
          cid,
        }
      );

      console.log("all chats", res);
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
      <div className=" relative w-[85%] h-[90%] bg-[#EFF6FC]   rounded-3xl flex  justify-between p-5 ">
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
          // socket={socket}
          // selectedChatCompare={selectedChatCompare}
          // currentUser={currentUser}
          // setCurrentUser={setCurrentUser}
        />
      </div>
    </div>
  );
}

export default ChatScreen
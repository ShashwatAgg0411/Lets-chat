import React, { useEffect, useState } from "react";
import ChatBlock from "./ChatBlock";
import axios from "axios";
import { toast } from "react-toastify";
import SearchChatBlock from "./SearchChatBlock";
import CreateGroup from "./CreateGroup";

function AllChats({
  selectedChat,
  setSelectedChat,
  allChats,
  setAllChats,
  fetchAllChats,
}) {
  const [searchText, setSearchtext] = useState("");
  // const [allChats, setAllChats] = useState([]);
  const [searchChats, setSearchChats] = useState([]);
  const [showCreateGroup, setShowCreateGroup] = useState(false);

  // const fetchAllChats = async () => {
  //   const user = JSON.parse(localStorage.getItem("user"));
  //   let cid = user._id;

  //   try {
  //     let res = await axios.post("http://localhost:3001/chat/allChats", {
  //       cid,
  //     });

  //     console.log("all chats", res);
  //     setAllChats(res.data)
  //   } catch (err) {
  //     // console.log(err);
  //     toast.error(err.response.data.message, {
  //       position: "top-right",
  //     });
  //   }

  // }

  useEffect(() => {
    fetchAllChats();
  }, []);

  const handleSubmitSearch = async (e) => {
    e.preventDefault();
    let currentuser = JSON.parse(localStorage.getItem("user"));
    // console.log(currentuser);

    if (!currentuser || !searchText) {
      toast.error("please enter something to search", {
        position: "top-right",
      });
    } else {
      try {
        let res = await axios.get(
          process.env.REACT_APP_NODE_ENV === "production"
            ? `https://lets-chat-5ou7.onrender.com/search?q=${searchText}&id=${currentuser._id}`
            : `http://localhost:3001/search?q=${searchText}&id=${currentuser._id}`
        );
        // console.log(res.data);
        setSearchChats(res.data);
        if (res.data.length === 0) {
          toast.error("no users found with this search", {
            position: "top-right",
          });
        }
        // console.log("submitted");
      } catch (err) {
        toast.error(err.response.data.message, {
          position: "top-right",
        });
      }
    }
  };
  return (
    <div
      className={` ${
        selectedChat ? "hidden sm:flex" : "flex"
      }   relative w-[80%] sm:w-[30%] xl:w-[25%] h-[100%] bg-white  rounded-xl py-3 px-2  flex-col gap-2 shadow-[0_0px_10px_5px_#bfdbfe]`}
    >
      <div className=" flex flex-col overflow-y-scroll signupcontainer">
        <div className="flex flex-col pl-2 pr-3 relative mt-2 ">
          <div className="absolute right-1 flex items-center justify-center pr-3 py-1 ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              // width="1em"
              // height="1em"
              viewBox="0 0 16 16"
              className="w-8 h-8 cursor-pointer "
              onClick={() => {
                setSearchtext("");
                setSearchChats([]);
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
          <form onSubmit={handleSubmitSearch}>
            <input
              // className=" border-blue-200 px-2 py-1 rounded-md w-1/2 text-lg bg-[#C0DBEA] bg-opacity-50"
              className=" w-full px-6 py-2 rounded-lg font-medium bg-sky-50  bg-opacity-40 border border-blue-300 placeholder-gray-400 text-md focus:outline-none focus:border-blue-400 focus:bg-white focus:ring-1 focus:shadow-[0_0px_10px_5px_#bfdbfe]"
              placeholder="Search"
              id="search"
              name="search"
              value={searchText}
              onChange={(e) => {
                setSearchtext(e.target.value);
              }}
            ></input>
          </form>
          {searchChats && (
            <div className="absolue w-full top-full h-fit">
              {searchChats.map((c, idx) => (
                <SearchChatBlock
                  key={idx}
                  c={c}
                  setSelectedChat={setSelectedChat}
                  allChats={allChats}
                  setAllChats={setAllChats}
                  setSearchChats={setSearchChats}
                />
              ))}
            </div>
          )}
        </div>
        <div
          onClick={() => {
            setShowCreateGroup(!showCreateGroup);
          }}
          className="text-blue-400 shadow-[0_0px_15px_5px_#bfdbfe] pl-2 rounded-2xl  absolute bg-white w-fit h-12  bottom-0 right-0  mb-5 mr-3 md:mr-5 z-20  flex md:gap-1 justify-center items-center cursor-pointer "
        >
          <p className="text-sm md:text-base"> Create Group</p>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            // width="1em"
            // height="1em"
            viewBox="0 0 24 24"
            className="w-12 h-full    "
          >
            <path fill="currentColor" d="M11 13H5v-2h6V5h2v6h6v2h-6v6h-2z" />
          </svg>
        </div>

        {showCreateGroup && (
          <CreateGroup
            setShowCreateGroup={setShowCreateGroup}
            allChats={allChats}
            setAllChats={setAllChats}
            setSelectedChat={setSelectedChat}
          />
        )}

        <p className="text-lg font-bold  mt-3 px-2 ">Chats</p>
        {/* <div className="signupcontainer relative rounded-x  l flex-auto overflow-y-scroll"> */}
        <div className=" relative rounded-x  l flex-auto ">
          <div className="flex flex-col   pr-2">
            {allChats &&
              allChats.map((c, idx) => (
                <ChatBlock
                  key={idx}
                  c={c}
                  selectedChat={selectedChat}
                  setSelectedChat={setSelectedChat}
                />
              ))}
            {/* <ChatBlock />
          <ChatBlock />
          <ChatBlock />
          <ChatBlock />
          <ChatBlock />
          <ChatBlock />
          <ChatBlock />
          <ChatBlock />
          <ChatBlock />
          <ChatBlock />
          <ChatBlock />
          <ChatBlock /> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllChats;

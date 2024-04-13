import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import GroupChatBlock from "./GroupChatBlock";

function UserBadge({ u, groupUsers, setGroupUsers }) {
  const handleDeleteUserGroup = (u) => {
    let gu = groupUsers.filter((us) => u._id !== us._id);
    setGroupUsers(gu);
  };

  return (
    <div className="flex gap-1 items-center rounded-md bg-[#6E00FF] bg-opacity-60  px-2 py-1 text-xs font-medium text-white ring-1 ring-inset ring-blue-700/10">
      <p>{u.name}</p>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        // width="1em"
        // height="1em"
        viewBox="0 0 16 16"
        className="w-4 h-4 cursor-pointer "
        onClick={() => {
          handleDeleteUserGroup(u);
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
  );
}

function CreateGroup({
  setShowCreateGroup,
  allChats,
  setAllChats,
  setSelectedChat,
}) {
  const [groupName, setGroupName] = useState("");
  const [searchforGroup, setSearchforGroup] = useState("");
  const [groupUsers, setGroupUsers] = useState([]);
  const [searchResultsForGroup, setSearchResultsForGroup] = useState([]);

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    let currentuser = JSON.parse(localStorage.getItem("user"));
    console.log(currentuser);

    if (!currentuser || !searchforGroup) {
      toast.error("Please enter something to search", {
        position: "top-right",
      });
      setSearchResultsForGroup([]);
    } else {
      try {
        let res = await axios.get(
          process.env.REACT_APP_NODE_ENV === "production"
            ? `https://lets-chat-5ou7.onrender.com/search?q=${searchforGroup}&id=${currentuser._id}`
            : `http://localhost:3001/search?q=${searchforGroup}&id=${currentuser._id}`
        );
        // console.log(res.data);
        setSearchResultsForGroup(res.data.slice(0, 4));
        // console.log("submitted");
      } catch (err) {
        toast.error(err.response.data.message, {
          position: "top-right",
        });
      }
    }
  };

  const handleCreateGroup = async () => {
    const cuser = JSON.parse(localStorage.getItem("user"));
    let cid = cuser._id;
    let uids = groupUsers.map((u) => u._id);

    if (!cid || !uids || !groupName) {
      toast.error("Incomplete Details", {
        position: "top-right",
      });
    } else {
      try {
        let res = await axios.post(
          process.env.REACT_APP_NODE_ENV === "production"
            ? "https://lets-chat-5ou7.onrender.com/chat/createGroup"
            : "http://localhost:3001/chat/createGroup",
          {
            cid: cid,
            uids: uids,
            name: groupName,
          }
        );

        // console.log(res.data);
        if (res.data) {
          setAllChats([res.data, ...allChats]);
        }

        setShowCreateGroup(false);
        setSelectedChat(res.data)
        toast.success("Group created successfully", {
          position: "top-right",
        });
      } catch (err) {
        console.log(err);
        toast.error("Some Error Occured", {
          position: "top-right",
        });
      }
    }

    // console.log(cid, uids)
  };

  return (
    <div
      onClick={() => {
        setShowCreateGroup(false);
      }}
      className=" fixed top-0 left-0 w-screen h-screen bg-sky-100 bg-opacity-40 z-50 flex justify-center items-center "
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className=" w-[85%] min-[400px]:w-[75%] sm:w-[50%] md:w-[45%] lg:w-[40%] xl:w-[35%] h-fit bg-white    p-4 border border-slate-300 rounded-xl  shadow-[0_0px_15px_5px_#bfdbfe]"
      >
        <div className="flex flex-col gap-4 pr-3 relative ">
          {/* <form className=" flex flex-col gap-3"> */}

          <div className=" flex justify-between items-center w-full h-fit border-b border-black border-opacity-20 pb-1">
            <p className=" text-lg font-medium">Create Group</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              // width="1em"
              // height="1em"
              viewBox="0 0 16 16"
              className="w-6 h-6 cursor-pointer "
              onClick={() => {
                setShowCreateGroup(false);
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
          <input
            // className=" border-blue-200 px-2 py-1 rounded-md w-1/2 text-lg bg-[#C0DBEA] bg-opacity-50"
            className=" w-full px-6 py-2 rounded-lg font-medium bg-sky-50  bg-opacity-40 border border-blue-300 placeholder-gray-400 text-md focus:outline-none focus:border-blue-400 focus:bg-white focus:ring-1 focus:shadow-[0_0px_10px_5px_#bfdbfe]"
            placeholder="Chat Name"
            id="name"
            name="name"
            value={groupName}
            onChange={(e) => {
              setGroupName(e.target.value);
            }}
          ></input>

          <form className=" flex flex-col gap-3" onSubmit={handleSearchSubmit}>
            <input
              // className=" border-blue-200 px-2 py-1 rounded-md w-1/2 text-lg bg-[#C0DBEA] bg-opacity-50"
              className=" w-full px-6 py-2 rounded-lg font-medium bg-sky-50  bg-opacity-40 border border-blue-300 placeholder-gray-400 text-md focus:outline-none focus:border-blue-400 focus:bg-white focus:ring-1 focus:shadow-[0_0px_10px_5px_#bfdbfe]"
              placeholder="Search Users to Add to Group"
              id="search"
              name="search"
              value={searchforGroup}
              onChange={(e) => {
                setSearchforGroup(e.target.value);
              }}
            ></input>
          </form>
          <div className="flex gap-3 justify-center h-fit w-full flex-wrap ">
            {groupUsers &&
              groupUsers.map((u, idx) => (
                <UserBadge
                  key={idx}
                  u={u}
                  groupUsers={groupUsers}
                  setGroupUsers={setGroupUsers}
                />
              ))}
          </div>

          {searchResultsForGroup && (
            <div className="absolue w-full top-full h-fit">
              {searchResultsForGroup.map((c, idx) => (
                <GroupChatBlock
                  key={idx}
                  c={c}
                  groupUsers={groupUsers}
                  setGroupUsers={setGroupUsers}
                  setSearchResultsForGroup={setSearchResultsForGroup}
                />
              ))}
            </div>
          )}

          <div className=" flex justify-end">
            <button
              onClick={() => {
                handleCreateGroup();
              }}
              className=" bg-[#6E00FF] bg-opacity-75 rounded-full px-4 py-2 text-white"
            >
              Create Group
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateGroup;

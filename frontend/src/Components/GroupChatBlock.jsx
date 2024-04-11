import React from 'react'
import Profile from "../assets/profile.png"

function GroupChatBlock({
  c,
  groupUsers,
  setGroupUsers,
  setSearchResultsForGroup,
}) {
  const handleClick = (c) => {
    let r = groupUsers.filter((u) => u._id === c._id);

    if (r.length === 0) {
      setGroupUsers([c, ...groupUsers]);
      }
      setSearchResultsForGroup([])
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

export default GroupChatBlock
import React from 'react'
import moment from 'moment';

function Notification({
  n,
  setSelectedChat,
    setShowNotification,
  allNotifications,
  setAllNotifications,
}) {
  const getChatName = (c) => {
    // console.log(moment.tz.zonesForCountry("india"));
    // console.log(moment.tz.countries());
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
      <div
        onClick={() => {
          setSelectedChat(n.chat);
          let newAllNoti = allNotifications.filter(
            (noti) => noti.newMessage._id !== n.newMessage._id
          );
          setAllNotifications(newAllNoti);
          setShowNotification(false);
        }}
        className="w-full flex justify-between h-fit py-1 cursor-pointer "
      >
        <p className=" flex flex-wrap">
          {n.chat.isGroupChat
            ? `New Message in ${n.chat.name} `
            : `New Message from ${getChatName(n.chat)}`}
        </p>
        <p className=" text-end text-xs flex items-end">
          {moment(n.newMessage.updatedAt, moment.DATETIME_LOCAL_MS).format(
            "D MMM, h:mm a"
          )}
        </p>
      </div>
      <hr></hr>
    </>
  );
}

export default Notification
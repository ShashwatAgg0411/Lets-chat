import React from "react";
import Notification from "./Notification";

function NotificationBlock({
  showNotification,
  setShowNotification,
  allNotifications,
  setAllNotifications,
  setSelectedChat,
}) {
  return (
    <div
      onClick={() => {
        setShowNotification(false);
      }}
      className="fixed top-0 left-0 w-screen h-screen  z-50 flex justify-center items-center"
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="  w-[85%] min-[400px]:w-[80%] sm:w-[50%] md:w-[45%] lg:w-[40%] xl:w-[35%] h-fit max-h-[45%] bg-white flex flex-col gap-2 border border-slate-300 rounded-xl  shadow-[0_0px_15px_5px_#bfdbfe] p-3"
      >
        <div className="px-2 w-full h-fit py-2 text-lg font-semibold border-b border-black border-opacity-30">
          Notifications
        </div>
        <div className="signupcontainer overflow-y-scroll flex flex-col gap-2 px-2">
          {allNotifications.length == 0 && (
            <p className="text-center py-3">No new Messages</p>
          )}

          {allNotifications &&
            allNotifications.map((n, idx) => (
              <Notification
                key={idx}
                n={n}
                setSelectedChat={setSelectedChat}
                setShowNotification={setShowNotification}
                allNotifications={allNotifications}
                setAllNotifications={setAllNotifications}
              />
            ))}
          {/* <hr></hr> */}
          {/* <Notification />
          <Notification />
          <Notification />
          <Notification />
          <Notification />
          <Notification /> */}
        </div>
      </div>
    </div>
  );
}

export default NotificationBlock;

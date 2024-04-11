import React from 'react'
import moment from "moment"

function Message({ isSentbyOwner, message, time }) {
    
    return (
      <div
        className={`flex flex-wrap ${
          isSentbyOwner ? "justify-end" : "justify-start"
        }`}
      >
        <div
          className={`flex justify-between   w-fit min-w-[19%] gap-4 max-w-[90%] h-fit  px-4 py-2 rounded-2xl ${
            isSentbyOwner ? "bg-[#6E00FF] text-white" : "bg-[#E7E7E7]  "
          }`}
        >
          <p className=' leading-8 flex items-start'>{message}</p>
          <p className=' text-end text-[10px] flex items-end'>
            {moment(time, moment.DATETIME_LOCAL_MS).format(
              "D MMM, h:mm a"
            )}
          </p>
        </div>
      </div>
    );
}

export default Message
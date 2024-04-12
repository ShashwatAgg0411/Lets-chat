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
          className={`flex flex-wrap justify-between   w-fit min-w-[19%] gap-4 max-w-[90%] h-fit  px-4 py-2 xl:py-3 rounded-2xl ${
            isSentbyOwner ? "bg-[#6E00FF] text-white" : "bg-[#E7E7E7]  "
          }`}
        >
          <p className="  flex text-xs sm:text-sm lg:text-base items-start">
            {message}
          </p>
          <div className=" flex justify-end mr-0 ml-auto text-end  text-[8px] sm:text-[9px] xl:text-[10px] items-end ">
            <p className=''>
              {moment(time, moment.DATETIME_LOCAL_MS).format("D MMM, h:mm a")}
            </p>
          </div>
        </div>
      </div>
    );
}

export default Message
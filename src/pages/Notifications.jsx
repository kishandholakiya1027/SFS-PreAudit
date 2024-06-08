import moment from "moment";
import React from "react";

const Notifications = ({ messages }) => {
  return (
    <div className="bg-white mt-2 absolute top-full -right-[30px] p-5 shadow-lg grid grid-cols-1 gap-5 w-[500px] rounded z-50 h-fit max-h-[330px] overflow-auto tc">
      {messages?.length > 0 ? (
        messages?.map((item, i) => {
          return (
            <div className="flex items-center gap-4 cursor-pointer" key={i}>
              <div className="bg-[#106FEC] w-[42px] h-[42px] rounded-full text-white flex items-center justify-center font-[500] uppercase">
                {item?.member?.name?.charAt(0)}
              </div>
              <div className="text-start w-[calc(100%-58px)]">
                <div className="flex items-center justify-between">
                  <h4
                    className={`font-[500] text-[14px] leading-[21px] capitalize`}
                  >
                    {item?.member?.role}
                  </h4>
                  <p className="text-[9px]">
                    {item?.isView ? (
                      moment(item?.createdAt).fromNow()
                    ) : (
                      <div className="w-2 h-2 rounded-full bg-red-600"></div>
                    )}
                  </p>
                </div>
                <p className={`font-[400] text-[12px] leading-[21px]`}>
                  {item?.message.slice(0, 66)}
                  {item?.message?.length > 66 && " ..."}
                </p>
              </div>
            </div>
          );
        })
      ) : (
        <h3 className="text-[14px] font-[500] text-[#323232] text-start">
          Notifications not found
        </h3>
      )}
    </div>
  );
};

export default Notifications;

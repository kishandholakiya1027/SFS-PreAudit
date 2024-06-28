import React, { useEffect, useMemo, useState } from "react";
import { BsArrowRight } from "react-icons/bs";
import { MdAddCircleOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { convertMessages } from "../../utils/message";
import { LoaderIcon } from "react-hot-toast";
import { getNotificationByUser2 } from "../../store/action/notificationAction";

const Notification = ({ setNotification }) => {
  const dispatch = useDispatch();
  const admin = JSON.parse(localStorage.getItem("admin"));
  const [loading, setLoading] = useState(true);
  const accessToken = JSON.parse(localStorage.getItem("accessToken"));
  const refreshToken = JSON.parse(localStorage.getItem("refreshToken"));
  const { notifications } = useSelector((state) => state.notificationsReducer);

  const allNotifications = useMemo(() => {
    if (notifications) {
      return convertMessages(notifications?.slice(0, 7));
    } else {
      setLoading(false);
      return [];
    }
  }, [notifications]);

  useEffect(() => {
    if (accessToken && refreshToken && admin && notifications?.length === 0) {
      dispatch(getNotificationByUser2(admin?.id, setLoading));
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between mb-[10px]">
        <h3 className="text-[14px] font-[500] text-[#323232]">Notification</h3>
        <button onClick={() => setNotification(true)}>
          <MdAddCircleOutline className="w-[21px] h-[21px] text-[#106FEC]" />
        </button>
      </div>
      <div className="bg-[#fff] rounded-[10px] border-2 border-[#EFF6FE] p-[30px] flex flex-col justify-between h-full 2xl:min-h-[420px] min-h-[508px]">
        {loading ? (
          <div className="flex items-center justify-center w-full h-full min-h-[331px]">
            <LoaderIcon className="!w-[18px] !h-[18px] !border-r-[#106FEC]" />
          </div>
        ) : allNotifications?.length > 0 ? (
          <>
            <div>
              {allNotifications?.map((item, i) => {
                return (
                  <div
                    key={i}
                    className="flex items-start gap-[20px] mb-[24px]"
                  >
                    <div className="flex items-center gap-[10px]">
                      <h2 className="text-[#0D0C22] text-[12px] font-[400] -tracking-[0.24px] leading-[18px] text-nowrap">
                        {item.date}
                      </h2>
                      <span className="w-[9px] h-[9px] bg-[#000] rounded-full block"></span>
                    </div>
                    <ul className="flex gap-2 flex-col">
                      {item?.list?.map((ite, inx) => (
                        <li
                          key={inx}
                          className={`flex ${ite.isView && "gap-[17px]"}`}
                        >
                          {/* {ite.isView && (
                          <BiCaretRight className="text-[#106FEC]" />
                        )} */}
                          <div className="flex gap-[15px] leading-[18px]">
                            <h4
                              className={`text-[12px] font-[400] text-nowrap ${
                                ite.isView
                                  ? "text-[#A5A6A9]"
                                  : "text-[#000] font-[600]"
                              }`}
                            >
                              {ite.time}
                            </h4>
                            <p
                              className={`text-[12px] font-[400] ${
                                ite.isView
                                  ? "text-[#A5A6A9]"
                                  : ite.isView
                                  ? "text-[#000]"
                                  : "text-[#000] font-[600]"
                              }`}
                            >
                              {ite.message}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
            <div className="text-right">
              <button
                type="button"
                onClick={() => setNotification(true)}
                className="flex items-center justify-end gap-[6px] text-[12px] font-[400] -tracking-[0.24px] text-[#106FEC] w-full"
              >
                Show All <BsArrowRight />
              </button>
            </div>
          </>
        ) : (
          <p className="flex items-center justify-center w-full h-full min-h-[360px]">
            Notifications not found
          </p>
        )}
      </div>
    </div>
  );
};

export default Notification;

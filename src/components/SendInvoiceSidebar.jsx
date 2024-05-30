import React from "react";
import { ImUserPlus } from "react-icons/im";
import { useLocation, useParams } from "react-router-dom";

const SendInvoiceSidebar = () => {
  const location = useLocation();
  const { id } = useParams();
  const menus = [
    {
      name: "Invoice",
      link: `/pre_audit/sent_invoices/${id}/send-invoice`,
      icon: ImUserPlus,
    },
  ];
  return (
    <div className="flex flex-col gap-4 relative">
      {menus?.length &&
        menus?.map((menu, i) => (
          <div className="relative" key={i}>
            <button
              disabled
              key={i}
              className={` ${menu?.margin && "mt-5"} text-left ${
                location.pathname.includes(menu?.link)
                  ? "bg-[#1265D2] text-[#fff]"
                  : "bg-[#E8EEF2]"
              } pl-[14px] py-[15px] pr-[27px] group  text-sm  gap-3.5 font-medium hover:bg-[#1265D2] max-w-[134px] h-[64px] flex items-center ease-in-out duration-100`}
            >
              <h2
                className={` duration-500 break-words w-[96px] group-hover:text-[#fff]`}
              >
                {menu?.name}
              </h2>
            </button>
            {location.pathname.includes(menu?.link) && (
              <div
                className={`absolute top-1/2 -translate-y-1/2 -right-2 w-[22px] h-[22px] rotate-45 bg-[#1265D2]`}
              ></div>
            )}
          </div>
        ))}
    </div>
  );
};

export default SendInvoiceSidebar;

import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const ExpenseSidebar = () => {
  const location = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();
  const menus = [
    {
      name: "Organisation",
      link: `/pre_audit/project/${id}/review/organisation`,
    },
    {
      name: "Chain of Custody",
      link: `/pre_audit/project/${id}/review/chain_of_custody`,
    },
    {
      name: "Environmental",
      link: `/pre_audit/project/${id}/review/environmental`,
    },
    {
      name: "Social and Labour",
      link: `/pre_audit/project/${id}/review/social_and_labour`,
    },
  ];

  return (
    <div className="flex flex-col gap-4 relative">
      {menus?.length &&
        menus?.map((menu, i) => (
          <div className="relative" key={i}>
            <button
              onClick={() => navigate(menu?.link)}
              key={i}
              className={` ${menu?.margin && "mt-5"} ${
                location.pathname.includes(menu?.link)
                  ? "bg-[#1265D2] text-[#fff]"
                  : "bg-[#E8EEF2]"
              } pl-[14px] py-[15px] pr-[27px] group  text-sm  gap-3.5 font-medium hover:bg-[#1265D2] max-w-[134px] h-[64px] flex items-center ease-in-out duration-100`}
            >
              <h2
                className={`duration-100 break-words w-[96px] group-hover:text-[#fff]`}
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

export default ExpenseSidebar;

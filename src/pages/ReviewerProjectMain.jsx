import React from "react";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";

const ReviewerProjectMain = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  const tabs = [
    {
      id: "1",
      label: "Pre Audit Assessment Review",
      link: `/pre_audit/project/${id}/review/organisation`,
      active: `/pre_audit/project/${id}/review`,
      content: "Content for Tab 1",
    },
    {
      id: "2",
      label: "Audit Scheduling",
      link: `/pre_audit/project/${id}/scheduling/company_details`,
      active: `/pre_audit/project/${id}/scheduling`,
      content: "Content for Tab 2",
    },
  ];

  return (
    <div>
      <div className="w-full rounded p-[40px] h-[calc(100vh-57px)] overflow-auto bg-[#F9FCFF]">
        <ul
          className={`flex items-center gap-[40px] ${
            location.pathname?.includes(tabs)
              ? "border-[#106FEC]"
              : "border-b border-[#D2D8DD]"
          }`}
        >
          {tabs.length > 0 &&
            tabs.map((item, i) => {
              return (
                <li key={i}>
                  <button
                    type="button"
                    onClick={() => navigate(item.link)}
                    className={`px-3 py-[15px] text-[16px] leading-[24px] border-b-[5px] ${
                      location.pathname.includes(item.active)
                        ? "border-[#106FEC] text-[#106FEC] rounded-t font-[600]"
                        : "text-[#000] border-transparent font-[300]"
                    }`}
                  >
                    {item.label}
                  </button>
                </li>
              );
            })}
        </ul>
        <Outlet />
      </div>
    </div>
  );
};

export default ReviewerProjectMain;

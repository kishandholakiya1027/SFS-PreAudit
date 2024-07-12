import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Dashboard from "../../assets/images/dashboard.svg";
import DashboardHover from "../../assets/images/hoverDashboard.png";
import Project from "../../assets/images/projecticon.svg";
import ProjectHover from "../../assets/images/hoverprojecticon.svg";

const Sidebar = () => {
  const [open] = useState(false);
  const location = useLocation();

  const menus = [
    {
      name: "Dashboard",
      link: `/pre_audit/dashboard`,
      active: `/pre_audit/dashboard`,
      icon: Dashboard,
      hover: DashboardHover,
    },
    {
      name: "Project",
      active: `/pre_audit/project`,
      link: `/pre_audit/project`,
      icon: Project,
      hover: ProjectHover,
    },
  ];

  return (
    <section className="flex gap-6">
      <div
        className={`bg-[#106FEC] min-h-screen ${
          open ? "w-72" : "w-[140px]"
        } duration-500 text-gray-100 px-4`}
      >
        <Link
          to="/pre_audit/dashboard"
          className={`2xl:my-12 my-4 flex justify-center text-[18px] font-[600] leading-[27px]`}
        >
          SFS Logo
        </Link>
        <div className="flex justify-center items-center flex-col 2xl:gap-4 gap-2 relative text-white">
          {menus?.length &&
            menus?.map((menu, i) => (
              <Link
                to={menu?.link}
                key={i}
                className={`sideMenu ${menu?.margin && "mt-5"}
                                group flex items-center flex-col text-[12px] leading-[18px] font-600 gap-[10px] font-medium p-[8px] rounded-md text-[#fff]`}
              >
                <div
                  className={`flex items-center justify-center ${
                    location.pathname.includes(menu?.active)
                      ? "bg-white"
                      : "bg-[#217ffa]"
                  } rounded-[12px] w-[50px] h-[50px]`}
                >
                  <img
                    src={
                      location.pathname.includes(menu?.active)
                        ? menu?.hover
                        : menu?.icon
                    }
                    alt="icon"
                    className=""
                  />
                </div>
                <h2
                  style={{
                    transitionDelay: `${i + 3}00ms`,
                  }}
                  className={`whitespace-pre duration-500 text-[#fff] text-[12px] font-[600] leading-[18px]`}
                >
                  {menu?.name}
                </h2>
              </Link>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Sidebar;

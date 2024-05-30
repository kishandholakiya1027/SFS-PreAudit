import React from "react";
import { MdAddCircleOutline } from "react-icons/md";
import Team1 from "../../assets/images/team1.svg";
import Team2 from "../../assets/images/team2.svg";
import Team3 from "../../assets/images/team3.svg";

const data = [
  {
    image: Team1,
    title: "John Smith",
    role: "Super Admin",
  },
  {
    image: Team2,
    title: "Smith  Thorelm",
    role: "Admin",
  },
  {
    image: Team3,
    title: "Nick B Sevenls",
    role: "Approval Level",
  },
];

const TeamMember = () => {
  return (
    <div className="mb-[24px]">
      <div className="flex items-center justify-between mb-[10px]">
        <h3 className="text-[14px] font-[500] text-[#323232]">Team Members</h3>
        <MdAddCircleOutline className="w-[21px] h-[21px] text-[#106FEC]" />
      </div>
      <div className="bg-[#fff] rounded-[10px] border-2 border-[#EFF6FE] grid 2xl:grid-cols-4 lg:grid-cols-3 grid-cols-2 p-[22px] gap-[40px]">
        {data.map((item, i) => (
          <div className="col-span-1 flex items-center gap-[14px]" key={i}>
            <div>
              <img src={item.image} alt="images" />
            </div>
            <div>
              <h4 className="text-[14px] font-[500] -tracking-[0.28px]">
                {item.title}
              </h4>
              <p className="text-[12px] font-[300] text-[#A5A6A9] -tracking-[0.24px]">
                {item.role}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamMember;

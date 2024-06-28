import React, { useEffect, useMemo, useState } from "react";
import { MdAddCircleOutline } from "react-icons/md";
import Team1 from "../assets/images/team1.svg";
import Team2 from "../assets/images/team2.svg";
import Team3 from "../assets/images/team3.svg";
import { useDispatch, useSelector } from "react-redux";
import { GetMembers } from "../store/action/AdminActions/memberAction";
import { LoaderIcon } from "react-hot-toast";

const images = [Team1, Team2, Team3, Team1];

const TeamMember = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const admin = JSON.parse(localStorage.getItem("admin"));
  const { member } = useSelector((state) => state.memberReducer);

  const data = useMemo(() => {
    if (member?.length) {
      return member.filter((item) => item.id !== admin?.id);
    }
  }, [member]);

  useEffect(() => {
    if (member?.length === 0) {
      dispatch(GetMembers(setLoading));
    } else {
      setLoading(false);
    }
  }, [dispatch]);

  return (
    <div className="mb-[24px]">
      <div className="flex items-center justify-between mb-[10px]">
        <h3 className="text-[14px] font-[500] text-[#323232]">Team Members</h3>
        <MdAddCircleOutline className="w-[21px] h-[21px] text-[#106FEC]" />
      </div>
      <div className="bg-[#fff] rounded-[10px] border-2 border-[#EFF6FE] grid 2xl:grid-cols-4 lg:grid-cols-3 grid-cols-2 p-[22px] gap-[40px]">
        {loading ? (
          <div className="flex items-center justify-center w-full h-full col-span-4 min-h-[49px]">
            <LoaderIcon className="!w-[18px] !h-[18px] !border-r-[#106FEC]" />
          </div>
        ) : (
          data?.slice(0, 4)?.map((item, i) => (
            <div className="col-span-1 flex items-center gap-[14px]" key={i}>
              <div>
                <img src={images[i]} alt="images" />
              </div>
              <div>
                <h4 className="text-[14px] font-[500] -tracking-[0.28px]">
                  {item.name}
                </h4>
                <p className="text-[12px] font-[300] text-[#A5A6A9] -tracking-[0.24px]">
                  {item.role}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TeamMember;

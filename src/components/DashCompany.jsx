import React, { useEffect, useMemo, useState } from "react";
import { MdAddCircleOutline } from "react-icons/md";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LoaderIcon } from "react-hot-toast";
import { GetReviewe } from "../store/action/SendRevieweAction";

const DashCompany = () => {
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(true);
  const { reviewer } = useSelector((state) => state.sendRevieweReducer);

  const data = useMemo(() => {
    if (reviewer?.length) {
      return reviewer?.filter(
        (item) =>
          item?.status === "5" &&
          item?.ncr_status === "approved" &&
          item?.reviewer !== null
      );
    }
  }, [reviewer]);

  useEffect(() => {
    dispatch(GetReviewe(setLoading));
  }, [dispatch]);

  return (
    <div>
      <div className="flex items-center justify-between mb-[10px]">
        <h3 className="text-[14px] font-[500] text-[#323232]">Invoice List</h3>
        <Link to="/audit/project">
          <MdAddCircleOutline className="w-[21px] h-[21px] text-[#106FEC]" />
        </Link>
      </div>
      <div className="bg-[#fff] rounded-[10px] border-2 border-[#EFF6FE] p-[22px] h-full min-h-[268px]">
        {isLoading ? (
          <div className="flex items-center justify-center w-full h-full min-h-[196px] mb-6">
            <LoaderIcon className="!w-[18px] !h-[18px] !border-r-[#106FEC]" />
          </div>
        ) : data?.length > 0 ? (
          <table className="w-full !bg-white mb-6">
            <thead>
              <tr>
                <th className="text-[#565E60] text-[12px] font-[500] leading-[18px] -tracking-[0.24px] text-left pb-[15px] border-b-2 border-[#EFF6FE]">
                  Company ID
                </th>
                <th className="text-[#565E60] text-[12px] font-[500] leading-[18px] -tracking-[0.24px] text-left pb-[15px] border-b-2 border-[#EFF6FE]">
                  Company Name
                </th>
                <th className="text-[#565E60] text-[12px] font-[500] leading-[18px] -tracking-[0.24px] text-left pb-[15px] border-b-2 border-[#EFF6FE]">
                  Company Person
                </th>
                <th className="text-[#565E60] text-[12px] font-[500] leading-[18px] -tracking-[0.24px] text-left pb-[15px] border-b-2 border-[#EFF6FE]">
                  Email Address
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.slice(0, 4)?.map((item, i) => (
                <tr key={i}>
                  <td className="text-[#000] text-[12px] font-[500] -tracking-[0.24px] text-left leading-[38px]">
                    {item.id}
                  </td>
                  <td className="text-[#000] text-[12px] font-[500] -tracking-[0.24px] text-left leading-[38px]">
                    {item?.alldata?.clientData?.company_name}
                  </td>
                  <td className="text-[#000] text-[12px] font-[500] -tracking-[0.24px] text-left leading-[38px]">
                    {item?.alldata?.clientData?.contact_p_name}
                  </td>
                  <td className="text-[#000] text-[12px] font-[500] -tracking-[0.24px] text-left leading-[38px]">
                    {item?.alldata?.clientData?.email}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="flex items-center justify-center w-full h-full min-h-[224px]">
            Clients not found
          </p>
        )}
      </div>
    </div>
  );
};

export default DashCompany;

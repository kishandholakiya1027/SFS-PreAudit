import React, { useEffect, useMemo, useState } from "react";
import { BsArrowRightShort } from "react-icons/bs";
import TeamMember from "./TeamMember";
import DashCompany from "./DashCompany";
import { useDispatch, useSelector } from "react-redux";
import Model from "./common/Model";
import { GetUser } from "../store/action/registerAction";
import { api } from "../axios/api";
import { Link, useOutletContext } from "react-router-dom";
import { LoaderIcon } from "react-hot-toast";
import { dashboardData } from "../store/action/dashboard";
import Notification from "./common/Notification";

const cards = [
  {
    title: "Pending Invoices",
    count: "0",
  },
  {
    title: "Invoice send",
    count: "0",
  },
  {
    title: "Pending Payment",
    count: "0",
  },
  {
    title: "Cancel Invoice",
    count: "0",
  },
  {
    title: "Invoice Paid by Client",
    count: "0",
  },
];

const ClientDashboard = () => {
  const [isSubmit, setIsSubmit] = useState(false);
  const { user } = useSelector((state) => state.UserReducer);
  const token = localStorage.getItem("accessToken");
  const { setNotification } = useOutletContext();
  const [cardData, setCardData] = useState(cards);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const { dashboard } = useSelector((state) => state.dashboardReducer);
  const [data, setData] = useState({
    password: "",
    c_password: "",
  });
  const [dataError, setDataError] = useState({
    password: "",
    c_password: "",
  });

  const currentData = useMemo(() => {
    if (user.length) {
      return user.find((item) => item.token === token?.replaceAll('"', ""));
    }
  }, [token, user]);

  useEffect(() => {
    if (currentData && currentData?.is_pass_approve === "0") {
      setIsSubmit(true);
    } else {
      setIsSubmit(false);
    }
  }, [currentData]);

  useEffect(() => {
    if (!dashboard) {
      dispatch(dashboardData(setLoading));
    } else {
      setLoading(false);
    }
  }, [dashboard]);

  useEffect(() => {
    if (dashboard) {
      setCardData(() => {
        return [
          {
            title: "Pending Invoices",
            count: dashboard?.pendingInvoice,
          },
          {
            title: "Invoice send",
            count: dashboard?.invoiceSend,
          },
          {
            title: "Pending Payment",
            count: dashboard?.pendingPayment,
          },
          {
            title: "Cancel Invoice",
            count: dashboard?.cancelInvoice,
          },
          {
            title: "Invoice Paid by Client",
            count: dashboard?.closeInvoice,
          },
        ];
      });
    }
  }, [dashboard]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));

    if (name === "password") {
      if (value === "") {
        setDataError((prev) => ({ ...prev, [name]: "Requied!" }));
      } else {
        setDataError((prev) => ({ ...prev, [name]: "" }));
      }
    }

    if (name === "c_password") {
      if (value === "") {
        setDataError((prev) => ({ ...prev, [name]: "Requied!" }));
      } else if (value !== data.password) {
        setDataError((prev) => ({
          ...prev,
          [name]: "Password And confirm password not match!",
        }));
      } else {
        setDataError((prev) => ({ ...prev, [name]: "" }));
      }
    }
  };

  const handleChangesPass = async () => {
    try {
      if (
        data.password !== "" &&
        dataError.c_password === "" &&
        dataError.password === ""
      ) {
        const payload = {
          userid: currentData.id,
          password: data.password,
        };
        const res = await api("/forgetPass", "post", payload);
        if (res.status === 200) {
          setIsSubmit(false);
          dispatch(GetUser());
        }
      } else {
        if (data.password === "") {
          setDataError((prev) => ({ ...prev, password: "Requied!" }));
        }
        if (data.c_password === "") {
          setDataError((prev) => ({ ...prev, c_password: "Requied!" }));
        } else if (data.c_password !== data.password) {
          setDataError((prev) => ({
            ...prev,
            password: "Password And confirm password not match!",
          }));
        }
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const body = (
    <div className="mt-[20px] text-left relative z-50">
      <div className="w-[420px] relative">
        <div className="relative text-left">
          <label
            htmlFor="password"
            className="text-[14px] text-[#000] font-Roboto font-[400] mb-[7px]"
          >
            Change Password
          </label>
          <input
            type="text"
            className="w-full py-[10px] px-1 text-[14px] text-[#565E60] bg-[#fff] border-b border-[#D2D8DD] outline-none"
            placeholder="Enter Password"
            onChange={(e) => handleChange(e)}
            onBlur={(e) => handleChange(e)}
            name="password"
            value={data.password}
            id="password"
          />
        </div>
        {dataError.password && (
          <p className="text-[#ff0000] text-[10px] pt-1 capitalize">
            {dataError.password}
          </p>
        )}
      </div>
      <div className="w-[420px] relative  mt-[30px]">
        <div className="relative text-left">
          <label
            htmlFor="c_password"
            className="text-[14px] text-[#000] font-Roboto font-[400] mb-[7px]"
          >
            Confirm Password
          </label>
          <input
            className="w-full py-[10px] px-1 text-[14px] text-[#565E60] bg-[#fff] border-b border-[#D2D8DD] outline-none"
            placeholder="Enter Confirm Password"
            type="password"
            onChange={(e) => handleChange(e)}
            onBlur={(e) => handleChange(e)}
            value={data.c_password}
            name="c_password"
            id="c_password"
            required
          />
        </div>
        {dataError.c_password && (
          <p className="text-[#ff0000] text-[10px] pt-1 capitalize">
            {dataError.c_password}
          </p>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-[calc(100vh-57px)] 2xl:p-10 p-6 bg-[#F9FCFF]">
      <div className="grid grid-cols-5 gap-[30px]">
        {cardData?.length > 0 &&
          cardData.map((item, i) => {
            return (
              <Link
                key={i}
                to={!loading && item.link}
                className="min-w-[215px] w-full 2xl:h-[130px] h-[99px] bg-white rounded-[10px] border-2 border-[#EFF6FE] col-span-1 hover:shadow-md hover:bg-slate-200 hover:border-slate-200 transition-all duration-150 cursor-pointer"
              >
                {loading ? (
                  <div className="flex items-center justify-center w-full h-full">
                    <LoaderIcon className="!w-[18px] !h-[18px] !border-r-[#106FEC]" />
                  </div>
                ) : (
                  <>
                    <div className="2xl:p-3 pt-2 pr-2 flex justify-end">
                      <BsArrowRightShort className="w-[16px] h-[16px] text-[#116CE3]" />
                    </div>
                    <div className="flex items-end justify-between 2xl:px-5 2xl:pb-5 px-3 pb-3">
                      <div>
                        <h3 className="2xl:text-[28px] text-[24px] font-[500]">
                          {item.count}
                        </h3>
                        <p className="2xl:text-[14px] text-[12px] font-[300]">
                          {item.title}
                        </p>
                      </div>
                    </div>
                  </>
                )}
              </Link>
            );
          })}
      </div>
      <div className="2xl:mt-10 mt-5 grid grid-cols-8 2xl:gap-9 gap-6">
        <div className="col-span-5">
          <TeamMember />
          <DashCompany />
        </div>
        <div className="col-span-3">
          <Notification setNotification={setNotification} />
        </div>
      </div>
      <Model
        isOpen={isSubmit}
        setIsOpen={setIsSubmit}
        title={"Change Password"}
        buttonText={"Save"}
        buttonBg={"bg-[#106FEC]"}
        onSubbmit={handleChangesPass}
        buttonText2={"Cancel"}
        button2Bg={"bg-[#D9D9D9]"}
        onSubbmit2={""}
        body={body}
        btnW1={"w-full"}
        btnW2={"w-full"}
        boxP={"p-[30px]"}
      />
    </div>
  );
};

export default ClientDashboard;

import React, { useEffect, useMemo, useState } from "react";
import { BsArrowRightShort } from "react-icons/bs";
import TeamMember from "./TeamMember";
import DashCompany from "./DashCompany";
import Assessments from "./Assessments";
import Appointments from "./Appointments";
import { useDispatch, useSelector } from "react-redux";
import Model from "./common/Model";
import { GetUser } from "../store/action/registerAction";
import { api } from "../axios/api";
import { useLocation } from "react-router-dom";

const ClientDashboard = () => {
  const [isSubmit, setIsSubmit] = useState(false);
  const [cardData, setCardData] = useState([]);
  const { user } = useSelector((state) => state.UserReducer);
  const token = localStorage.getItem("accessToken");
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.includes("accounts")) {
      const data = [
        {
          title: "Pending Invoices",
          count: "800",
          image: "",
        },
        {
          title: "Invoice send",
          count: "760",
          image: "",
        },
        {
          title: "Pending Payment",
          count: "40",
          image: "",
        },
        {
          title: "Cancel Invoice",
          count: "600",
          image: "",
        },
        {
          title: "Invoice Paid by Client",
          count: "600",
          image: "",
        },
      ];
      setCardData(data);
    }
  }, [location]);

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

  // useEffect(() => {
  //   dispatch(GetUser());
  // }, [dispatch]);

  useEffect(() => {
    if (currentData && currentData?.is_pass_approve === "0") {
      setIsSubmit(true);
    } else {
      setIsSubmit(false);
    }
  }, [currentData]);

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
          <p className="text-[#ff0000] text-[16px] pt-2 capitalize">
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
          <p className="text-[#ff0000] text-[16px] pt-2 capitalize">
            {dataError.c_password}
          </p>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-[calc(100vh-57px)] p-[40px] bg-[#F9FCFF]">
      <div className="grid grid-cols-5 gap-[30px]">
        {cardData?.length > 0 &&
          cardData.map((item, i) => {
            return (
              <div
                key={i}
                className="min-w-[215px] w-full h-[130px] bg-white rounded-[10px] border-2 border-[#EFF6FE] col-span-1 hover:shadow-md hover:bg-slate-200 hover:border-slate-200"
              >
                <div className="p-[12px] flex justify-end">
                  <BsArrowRightShort className="w-[16px] h-[16px] text-[#116CE3]" />
                </div>
                <div className="flex items-end justify-between p-[20px] pt-[3px]">
                  <div>
                    <h3 className="text-[28px] font-[500]">{item.count}</h3>
                    <p className="text-[14px] font-[300]">{item.title}</p>
                  </div>
                  {!location?.pathname?.includes("contracting") &&
                    item.image !== "" && (
                      <div>
                        <img src={item.image} alt="DashboardUser" />
                      </div>
                    )}
                </div>
              </div>
            );
          })}
      </div>
      <div className="mt-[40px] grid grid-cols-8 gap-[36px]">
        <div className="col-span-5">
          <TeamMember />
          <DashCompany />
          <Assessments />
        </div>
        <div className="col-span-3">
          <Appointments />
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

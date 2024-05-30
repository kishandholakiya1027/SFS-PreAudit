import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { CgLogOut } from "react-icons/cg";
import { FaChevronDown } from "react-icons/fa";
import { IoNotificationsOutline, IoSearchOutline } from "react-icons/io5";
import Lang from "../../assets/images/lang1.png";
import { useSelector } from "react-redux";

const AdminHeader = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const search = window.location.search;
  const params = new URLSearchParams(search);
  const invoiceId = params.get("id");
  const popoverDropdownRef = React.createRef();
  const [headerName, setHeaderName] = useState("");
  const langPopoverDropdownRef = React.createRef();
  const admin = JSON.parse(localStorage.getItem("admin"));
  const { oneExpanse } = useSelector((state) => state.OneExpenceReducer);
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const [langDropdownPopoverShow, setLangDropdownPopoverShow] =
    React.useState(false);

  const closeDropdownPopover = () => {
    setDropdownPopoverShow(!dropdownPopoverShow);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate(`/login`);
  };

  const handleDropdownPopover = () => {
    setLangDropdownPopoverShow(!langDropdownPopoverShow);
  };

  useEffect(() => {
    const path = location.pathname;
    if (path.includes("dashboard")) {
      setHeaderName("Dashboard");
    } else if (path.includes("pending_invoices")) {
      if (id && oneExpanse?.user?.name) {
        if (path.includes("companydetails")) {
          setHeaderName(
            "Assessment Review and Scheduling / " +
              invoiceId +
              "-" +
              oneExpanse?.user?.name
          );
        } else {
          setHeaderName(
            "Assessment Review and Scheduling / " +
              id +
              "-" +
              oneExpanse?.user?.name
          );
        }
      } else {
        setHeaderName("Assessment Review and Scheduling");
      }
    } else if (path.includes("sent_invoices")) {
      setHeaderName("Invoice");
    } else {
      setHeaderName("Dashboard");
    }
  }, [location, id, oneExpanse, invoiceId]);

  return (
    <div className="text-right flex" id="header">
      <div className="py-2 px-8 w-full bg-white box_shadow">
        <div className="flex items-center gap-[10px] justify-between relative ">
          <button type="button" className="text-[18px] font-[500] capitalize">
            {headerName}
          </button>
          <div className="flex items-center gap-[30px] headermain">
            <div className="relative">
              <input
                type="text"
                placeholder="Search"
                className="bg-[#F7FBFE] rounded-[6px] py-[10px] px-[14px] text-[14px] text-[#C4CDD3] w-[214px]"
              />
              <button className="absolute top-1/2 -translate-y-1/2 right-0 p-[12px] rounded-[6px]">
                <IoSearchOutline />
              </button>
            </div>
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  handleDropdownPopover();
                }}
                className="flex items-center gap-4"
              >
                <img src={Lang} alt="Lang" className="rounded-full" />
                <span>
                  <FaChevronDown className="text-[12px] text-[#C4C4C4]" />
                </span>
              </button>
              <div
                ref={langPopoverDropdownRef}
                className={
                  (langDropdownPopoverShow ? "block " : "hidden ") +
                  "bg-white text-base z-50 float-left list-none text-left rounded shadow-lg mt-1 absolute top-full right-0"
                }
                style={{ minWidth: "8rem" }}
              >
                <button
                  className={
                    "text-sm flex items-center gap-[10px] py-2 px-4 font-normal  w-full whitespace-nowrap bg-transparent text-left text-slate-700"
                  }
                  type="button"
                  onClick={handleDropdownPopover}
                >
                  <img src={Lang} alt="Lang" className="rounded-full" />
                  English
                </button>
              </div>
            </div>
            <span className="span1">
              <IoNotificationsOutline /> <span className="span2"></span>{" "}
            </span>
            {location.pathname === "/confirm-email" ? (
              <div className="border border-[#94a3b8] rounded">
                <button
                  className={
                    "text-sm flex items-center gap-[10px] py-2 px-4 font-normal w-full whitespace-nowrap bg-transparent text-left text-slate-700"
                  }
                  onClick={handleLogout}
                >
                  <CgLogOut className="text-[20px] text-slate-700" />
                  Logout
                </button>
              </div>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => {
                    closeDropdownPopover();
                  }}
                  className="flex items-center gap-4"
                >
                  <span className="uppercase w-[38px] h-[38px] rounded-[8px] flex items-center justify-center bg-[#106FEC] text-white text-[18px]">
                    {admin && admin?.name[0]}
                  </span>
                  <div className="text-left">
                    <h5 className="capitalize text-[14px] font-[500] leading-[21px">
                      {admin && admin?.name}
                    </h5>
                    <p className="capitalize text-[12px] font-[300] leading-[18px] text-[#565E60]">
                      Pre audit
                    </p>
                  </div>
                  <span>
                    <FaChevronDown className="text-[12px] text-[#C4C4C4]" />
                  </span>
                </button>
                <div
                  ref={popoverDropdownRef}
                  className={
                    (dropdownPopoverShow ? "block " : "hidden ") +
                    "bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg mt-1 absolute top-full right-0"
                  }
                  style={{ minWidth: "12rem" }}
                >
                  <button
                    className={
                      "text-sm flex items-center gap-[10px] py-2 px-4 font-normal  w-full whitespace-nowrap bg-transparent text-left text-slate-700"
                    }
                    onClick={handleLogout}
                  >
                    <CgLogOut className="text-[20px] text-slate-700" />
                    Logout
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;
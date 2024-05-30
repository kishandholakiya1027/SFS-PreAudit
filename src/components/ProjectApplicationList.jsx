import React, { useState } from "react";
import ClickAwayListener from "react-click-away-listener";
import { useRef } from "react";
import DataTable from "./DataTable";
import Filter from "../assets/images/Filter.svg";
import { useDispatch } from "react-redux";
import { GetAllExpense } from "../store/action/AdminActions/ExpenseAction";

export function EnhancedTable({
  data,
  renderRowActions,
  option,
  title,
  filter,
}) {
  const dropdownRef = useRef(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const [filters, setFilter] = useState({
    id: "",
    date: "",
    company_name: "",
  });
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilter((prev) => ({ ...prev, [name]: value }));
  };

  const handleClear = () => {
    setFilter({
      id: "",
      date: "",
      status: "",
      company_name: "",
    });
  };
  const handleSubmit = () => {
    const queryString = Object.keys(filters)
      .map(
        (key) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(filters[key])}`
      )
      .join("&");
    setShowDropdown(false);
    handleClear();
    dispatch(GetAllExpense(queryString, setLoading));
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div className="text-right min-h-[calc(100vh-210px)] overflow-x-auto">
      {(title || filter) && (
        <div
          className={`flex items-center min-w-[1200px] relative ${
            title ? "justify-between" : "justify-end"
          } mt-[17px]`}
          ref={dropdownRef}
        >
          {title && <h1 className="text-[16px] font-[600]">{title}</h1>}
          {filter && (
            <div className="">
              <button
                className={
                  "gap-[10px] inline-flex w-full items-center justify-center gap-x-[15px] bg-[#E8ECF0] rounded-[2px] py-[7px] px-[12px] text-sm font-[400] leading-4 text-black"
                }
                onClick={toggleDropdown}
              >
                {" "}
                Filter <img src={Filter} />
              </button>
            </div>
          )}
          {showDropdown && (
            <ClickAwayListener onClickAway={() => setShowDropdown(false)}>
              <div className="absolute text-left w-[300px] right-0 top-[30px] mt-2 bg-white border border-gray-300 rounded shadow-lg z-50">
                <div className="grid grid-cols-6 gap-5 p-5">
                  <div className="col-span-6">
                    <label
                      htmlFor="appId"
                      className="text-[14px] font-[400] text-[#000]"
                    >
                      Request No
                    </label>
                    <input
                      type="text"
                      name="id"
                      className="border-b border-[#000] w-full text-[14px] py-[10px] mt-[7px] outline-none"
                      placeholder="Enter"
                      id="id"
                      onChange={handleChange}
                      value={filters?.id}
                    />
                  </div>
                  <div className="col-span-6">
                    <label
                      htmlFor="appDate"
                      className="text-[14px] font-[400] text-[#000]"
                    >
                      Received Date
                    </label>
                    <input
                      type="text"
                      name="date"
                      className="border-b border-[#000] w-full text-[14px] py-[10px] mt-[7px] outline-none"
                      placeholder="Enter"
                      id="date"
                      onChange={handleChange}
                      value={filters?.date}
                    />
                  </div>
                  <div className="col-span-6">
                    <label
                      htmlFor="appId"
                      className="text-[14px] font-[400] text-[#000]"
                    >
                      Company Name
                    </label>
                    <input
                      type="text"
                      name="company_name"
                      id="company_name"
                      className="border-b border-[#000] w-full text-[14px] py-[10px] mt-[7px] outline-none"
                      placeholder="Enter"
                      onChange={handleChange}
                      value={filters?.company_name}
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between border-t p-5">
                  <button className="text-[14px] font-[500] text-[#CE1919]">
                    Clear all Filters
                  </button>
                  <button
                    className="text-[14px] font-[500] text-[#1B5DBF]"
                    onClick={handleSubmit}
                  >
                    Apply
                  </button>
                </div>
              </div>
            </ClickAwayListener>
          )}
        </div>
      )}
      <div className="text-left min-w-[1200px] w-full overflow-auto">
        <DataTable
          data={data}
          renderRowActions={renderRowActions}
          option={option ? option : "proApp"}
        />
      </div>
    </div>
  );
}

import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  getAuditorScheduleByUserId,
  PostAuditorScedule,
} from "../../store/action/AdminActions/AuditorSceduleAction";
import { GetMembersByRole } from "../../store/action/AdminActions/memberAction";
import { useParams } from "react-router-dom";
import ComboBox from "../../components/common/ComboBox";
import { LoaderIcon } from "react-hot-toast";
import QuertRaise from "../../components/common/QuertRaise";

const AuditorDetails = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { member_role } = useSelector((state) => state.memberRoleReducer);
  const { audit } = useSelector((state) => state.AuditorSceduleReducer);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(true);
  const [location, setLocation] = useState(null);
  const [isSubmit, setIsSubmit] = useState(false);
  const admin = JSON.parse(localStorage.getItem("admin"));
  const [data, setData] = useState({
    from: "",
    to: "",
    email: "",
    contact: "",
  });
  const [error, setError] = useState({
    from: "",
    to: "",
    auditor: "",
    email: "",
    contact: "",
  });

  const memberList = useMemo(() => {
    if (member_role?.length > 0) {
      const data = member_role?.map((item) => {
        return {
          id: item.id,
          name: item.name,
        };
      });
      return data;
    }
  }, [member_role]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((v) => {
      return {
        ...v,
        [name]: value,
      };
    });
    if (name === "from") {
      if (!value) {
        setError((prev) => ({ ...prev, [name]: "Please select date" }));
      } else {
        setError((prev) => ({ ...prev, [name]: "" }));
      }
    }
    if (name === "to") {
      if (!value) {
        setError((prev) => ({ ...prev, [name]: "Please select date" }));
      } else {
        setError((prev) => ({ ...prev, [name]: "" }));
      }
    }
    if (name === "contact") {
      if (!value) {
        setError((prev) => ({ ...prev, [name]: "Please enter contact no" }));
      } else if (!value.match(/^(\+\d{1,3}[- ]?)?\d{10}$/)) {
        setError((prev) => ({ ...prev, [name]: t("numberError") }));
      } else {
        setError((prev) => ({ ...prev, [name]: "" }));
      }
    }
    if (name === "email") {
      if (!value) {
        setError((prev) => ({ ...prev, [name]: "Please enter email" }));
      } else if (!value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
        setError((prev) => ({ ...prev, [name]: t("emailError") }));
      } else {
        setError((prev) => ({ ...prev, [name]: "" }));
      }
    }
  };

  useEffect(() => {
    if (data?.from && data?.to) {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [data]);

  const handleSave = () => {
    if (data?.from && data?.to && data?.email && data?.contact) {
      setLoading(true);
      const payload = {
        userid: id,
        auditor: location?.id,
        dateFrom: data.from,
        dateTo: data.to,
        contactNo: data.contact,
        email: data.email,
      };
      dispatch(PostAuditorScedule(payload, setLoading));
    } else {
      !data?.from &&
        setError((prev) => ({ ...prev, from: "Please select date" }));
      !data?.to && setError((prev) => ({ ...prev, to: "Please select date" }));
      show &&
        !data?.contact &&
        setError((prev) => ({ ...prev, contact: "Please enter contact no" }));
      show &&
        !data?.email &&
        setError((prev) => ({ ...prev, email: "Please enter email" }));
      show &&
        !location &&
        setError((prev) => ({ ...prev, auditor: "Please select auditor" }));
    }
  };

  useEffect(() => {
    dispatch(GetMembersByRole("Auditor"));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAuditorScheduleByUserId(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (location === null) {
      setError((prev) => ({ ...prev, auditor: "Please select auditor" }));
    } else {
      setError((prev) => ({ ...prev, auditor: "" }));
    }
    setError((prev) => ({ ...prev, auditor: "" }));
  }, [location, t]);

  useEffect(() => {
    if (audit && memberList?.length) {
      setShow(true);
      setData((prev) => {
        return {
          ...prev,
          from: audit?.dateFrom,
          to: audit?.dateTo,
          contact: audit?.contactNo,
          email: audit?.email,
        };
      });
      const auditor = memberList.find((item) => item.id === +audit?.auditor);
      setLocation(auditor);
      setLoading2(false);
    }
  }, [audit, memberList]);

  return (
    <div className="flex flex-col justify-between h-full gap-5">
      {loading2 ? (
        <div className="flex items-center justify-center w-full h-full min-h-[calc(100vh-281px)]">
          <LoaderIcon className="!w-12 !h-12 !border-r-[#106FEC]" />
        </div>
      ) : (
        <div>
          <div className="flex flex-wrap">
            <div className="w-1/3 mb-6 px-3 relative">
              <div>
                <label
                  htmlFor="from"
                  className="mb-[6px] text-[16px] leading-[18px] font-[400] font-Roboto"
                >
                  Date From
                </label>
                <input
                  type="date"
                  name="from"
                  id="from"
                  onChange={handleChange}
                  value={data?.from}
                  className="block w-full text-black border border-[#D2D8DD] sm:text-sm sm:leading-4 p-2 bg-white rounded-sm"
                  placeholder="Enter company name"
                />
              </div>
              {error?.from && (
                <p className="text-[10px] text-[#ff0000] pt-1 absolute top-full">
                  {error.from}
                </p>
              )}
            </div>
            <div className="w-1/3 mb-6 px-3 relative">
              <div>
                <label
                  htmlFor="to"
                  className="mb-[6px] text-[16px] leading-[18px] font-[400] font-Roboto"
                >
                  Date To
                </label>
                <input
                  type="date"
                  name="to"
                  id="to"
                  onChange={handleChange}
                  value={data?.to}
                  className="block w-full text-black border border-[#D2D8DD] sm:text-sm sm:leading-4 p-2 bg-white rounded-sm"
                  placeholder="Enter company name"
                />
              </div>
              {error?.to && (
                <p className="text-[10px] text-[#ff0000] pt-1 absolute top-full">
                  {error.to}
                </p>
              )}
            </div>
          </div>
          {show && (
            <>
              <div className="flex flex-wrap">
                <div className="w-1/3 mb-6 px-3 relative">
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-[6px] text-[16px] leading-[18px] font-[400] font-Roboto"
                    >
                      Auditor Name
                    </label>
                    <ComboBox
                      id="name"
                      name="name"
                      value={location?.name}
                      location={location}
                      option={memberList}
                      setLocation={setLocation}
                      onchange={(value) => setLocation(value)}
                      color={true}
                    />
                  </div>
                  {error?.auditor && (
                    <p className="text-[10px] text-[#ff0000] pt-1 absolute top-full">
                      {error.auditor}
                    </p>
                  )}
                </div>
                <div className="w-1/3 mb-6 px-3 relative">
                  <div>
                    <label
                      htmlFor="contact"
                      className="mb-[6px] text-[16px] leading-[18px] font-[400] font-Roboto"
                    >
                      Contact No
                    </label>
                    <input
                      type="text"
                      name="contact"
                      id="contact"
                      onChange={handleChange}
                      value={data?.contact}
                      className="block w-full text-black border border-[#D2D8DD] sm:text-sm sm:leading-4 p-2 bg-white rounded-sm"
                      placeholder="Enter contact no"
                    />
                  </div>
                  {error?.contact && (
                    <p className="text-[10px] text-[#ff0000] pt-1 absolute top-full">
                      {error.contact}
                    </p>
                  )}
                </div>
                <div className="w-1/3 mb-6 px-3 relative">
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-[6px] text-[16px] leading-[18px] font-[400] font-Roboto"
                    >
                      Email Address
                    </label>
                    <input
                      type="text"
                      name="email"
                      id="email"
                      onChange={handleChange}
                      value={data?.email}
                      className="block w-full text-black border border-[#D2D8DD] sm:text-sm sm:leading-4 p-2 bg-white rounded-sm"
                      placeholder="Enter email address"
                    />
                  </div>
                  {error?.email && (
                    <p className="text-[10px] text-[#ff0000] pt-1 absolute top-full">
                      {error.email}
                    </p>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      )}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setIsSubmit(true)}
          className="text-[16px] font-Roboto font-[500] leading-[18px] text-[#fff] py-[8px] px-[40px] bg-[#106FEC] rounded-[2px]"
        >
          Raise Query
        </button>
        <button
          type="button"
          disabled={loading}
          onClick={handleSave}
          className={`text-[16px] font-Roboto font-[500] leading-[18px] text-[#fff] py-[8px] px-[40px] bg-[#106FEC] rounded-[2px] w-[230px] flex items-center justify-center ${
            loading && "opacity-70"
          }`}
        >
          {loading ? (
            <LoaderIcon className="!w-[18px] !h-[18px]" />
          ) : (
            "Send Audit Schedule"
          )}
        </button>
      </div>
      <QuertRaise
        isSubmit={isSubmit}
        setIsSubmit={setIsSubmit}
        handleClose={() => setIsSubmit(false)}
        memberid={admin?.id}
        userid={id}
      />
    </div>
  );
};

export default AuditorDetails;

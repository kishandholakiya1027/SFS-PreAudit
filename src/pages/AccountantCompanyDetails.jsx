import React, { useEffect, useState } from "react";
import { LoaderIcon } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { GetOneClientInfo } from "../store/action/manageAction";
import { getOneExpense } from "../store/action/AdminActions/ExpenseAction";
import { SendLoginDetail } from "../store/action/AdminActions/SendDetailsAction";
import Checkbox from "../components/common/Checkbox";

const AccountantCompanyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const search = window.location.search;
  const params = new URLSearchParams(search);
  const invoiceId = params.get("id");
  const [payerCompany, setPayerCompany] = useState({
    company_name: "",
    email: "",
    client_name: "",
    contact_p_name: "",
  });
  const [payerCompanyError, setPayerCompanyError] = useState({
    company_name: "",
    email: "",
    client_name: "",
    contact_p_name: "",
  });
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loading2, setLoading2] = useState(false);
  const { clientInfo } = useSelector((state) => state.manageUserReducer);

  const handleSave = () => {
    if (
      payerCompany.company_name !== "" &&
      payerCompany.email !== "" &&
      payerCompany.client_name !== "" &&
      payerCompany.contact_p_name !== ""
    ) {
      setLoading2(true);
      dispatch(
        SendLoginDetail(id, navigate, setLoading2, {
          id: invoiceId,
          ...payerCompany,
        })
      );
    } else {
      !payerCompany.company_name &&
        setPayerCompanyError((prev) => ({
          ...prev,
          company_name: "Please Enter Company Name",
        }));
      !payerCompany.email &&
        setPayerCompanyError((prev) => ({
          ...prev,
          email: "Please Enter Email",
        }));
      !payerCompany.client_name &&
        setPayerCompanyError((prev) => ({
          ...prev,
          client_name: "Please Enter Client Name",
        }));
      !payerCompany.contact_p_name &&
        setPayerCompanyError((prev) => ({
          ...prev,
          contact_p_name: "Please Enter Contact Person Name",
        }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPayerCompany((prev) => ({ ...prev, [name]: value }));

    if (name === "company_name") {
      if (!value) {
        setPayerCompanyError((prev) => ({
          ...prev,
          [name]: "Please enter Company Name",
        }));
      } else {
        setPayerCompanyError((prev) => ({ ...prev, [name]: "" }));
      }
    }
    if (name === "email") {
      if (!value) {
        setPayerCompanyError((prev) => ({
          ...prev,
          [name]: "Please enter Email",
        }));
      } else {
        setPayerCompanyError((prev) => ({ ...prev, [name]: "" }));
      }
    }
    if (name === "client_name") {
      if (!value) {
        setPayerCompanyError((prev) => ({
          ...prev,
          [name]: "Please enter Client Name",
        }));
      } else {
        setPayerCompanyError((prev) => ({ ...prev, [name]: "" }));
      }
    }
    if (name === "contact_p_name") {
      if (!value) {
        setPayerCompanyError((prev) => ({
          ...prev,
          [name]: "Please enter Contact Person Name",
        }));
      } else {
        setPayerCompanyError((prev) => ({ ...prev, [name]: "" }));
      }
    }
  };

  useEffect(() => {
    dispatch(GetOneClientInfo(id, setLoading));
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(getOneExpense(invoiceId, setLoading));
  }, [dispatch]);

  useEffect(() => {
    if (isValid) {
      setPayerCompany({
        ...payerCompany,
        company_name: clientInfo?.company_name,
        email: clientInfo?.email,
        client_name: clientInfo?.contact_p_name,
        contact_p_name: clientInfo?.contact_p_name,
      });
      setPayerCompanyError(() => ({
        company_name: "",
        email: "",
        client_name: "",
        contact_p_name: "",
      }));
    } else {
      setPayerCompany({
        company_name: "",
        email: "",
        client_name: "",
        contact_p_name: "",
      });
    }
  }, [clientInfo, isValid]);

  return (
    <div
      className={`flex flex-col mt-[30px] h-[calc(100vh-246px)] justify-between`}
    >
      {loading ? (
        <div className="flex items-center justify-center w-full h-full">
          <LoaderIcon className="!w-12 !h-12 !border-r-[#106FEC]" />
        </div>
      ) : (
        <div>
          <h3 className="mb-[20px] text-[16px] font-[600] font-Poppins">
            Applicant Company Details
          </h3>
          <div className="grid grid-cols-3 gap-x-[20px] gap-y-[36px] mb-[40px]">
            <div className="col-span-1">
              <h6 className="text-[16px] font-[400] font-Roboto mb-[5px] leading-[18.75px]">
                Company Name
              </h6>
              <span className="text-[14px] font-[300] leading-[16.41px] font-Roboto capitalize">
                {clientInfo?.company_name}
              </span>
            </div>
            <div className="col-span-1">
              <h6 className="text-[16px] font-[400] font-Roboto mb-[5px] leading-[18.75px]">
                Client Name
              </h6>
              <span className="text-[14px] font-[300] leading-[16.41px] font-Roboto capitalize">
                {clientInfo?.contact_p_name}
              </span>
            </div>
            <div className="col-span-1">
              <h6 className="text-[16px] font-[400] font-Roboto mb-[5px] leading-[18.75px]">
                Email Address
              </h6>
              <span className="text-[14px] font-[300] font-Roboto">
                {clientInfo?.email}
              </span>
            </div>
            <div className="col-span-1">
              <h6 className="text-[16px] font-[400] font-Roboto mb-[5px] leading-[18.75px]">
                Contact Person
              </h6>
              <span className="text-[14px] font-[300] leading-[16.41px] font-Roboto capitalize">
                {clientInfo?.contact_p_name}
              </span>
            </div>
          </div>
          <h3 className="mb-[14px] text-[16px] font-[600] font-Poppins">
            Billing or Payer Company
          </h3>
          <div className="flex items-center gap-[6px] mb-[20px]">
            <Checkbox
              name="isAccept"
              onChange={() => setIsValid(!isValid)}
              checked={isValid}
              id="isAccept"
            />
            <label
              htmlFor="isAccept"
              className="text-[16px] leading-4 font-[300]"
            >
              Same as applicant company details
            </label>
          </div>
          <div className="grid grid-cols-3 gap-x-[20px] gap-y-[36px]">
            <div className="col-span-1 relative">
              <h6 className="text-[16px] font-[400] font-Roboto mb-[5px] leading-[18.75px]">
                Company Name
              </h6>
              <input
                type="text"
                name="company_name"
                id="company_name"
                value={payerCompany.company_name}
                onChange={(e) => handleChange(e)}
                className={`block w-full text-black border border-[#D2D8DD] sm:text-sm sm:leading-4 p-2 bg-white rounded-sm ${
                  isValid && "pointer-events-none"
                }`}
                placeholder="Enter Company Name"
              />
              {payerCompanyError?.company_name && (
                <p className="text-[10px] text-[#ff0000] pt-1 absolute top-full">
                  {payerCompanyError.company_name}
                </p>
              )}
            </div>
            <div className="col-span-1 relative">
              <h6 className="text-[16px] font-[400] font-Roboto mb-[5px] leading-[18.75px]">
                Client Name
              </h6>
              <input
                type="text"
                name="client_name"
                id="client_name"
                value={payerCompany.client_name}
                onChange={(e) => handleChange(e)}
                className={`block w-full text-black border border-[#D2D8DD] sm:text-sm sm:leading-4 p-2 bg-white rounded-sm ${
                  isValid && "pointer-events-none"
                }`}
                placeholder="Enter Client Name"
              />
              {payerCompanyError?.client_name && (
                <p className="text-[10px] text-[#ff0000] pt-1 absolute top-full">
                  {payerCompanyError.client_name}
                </p>
              )}
            </div>
            <div className="col-span-1 relative">
              <h6 className="text-[16px] font-[400] font-Roboto mb-[5px] leading-[18.75px]">
                Email Address
              </h6>
              <input
                type="text"
                name="email"
                id="email"
                value={payerCompany.email}
                onChange={(e) => handleChange(e)}
                className={`block w-full text-black border border-[#D2D8DD] sm:text-sm sm:leading-4 p-2 bg-white rounded-sm ${
                  isValid && "pointer-events-none"
                }`}
                placeholder="Enter Email"
              />
              {payerCompanyError?.email && (
                <p className="text-[10px] text-[#ff0000] pt-1 absolute top-full">
                  {payerCompanyError.email}
                </p>
              )}
            </div>
            <div className="col-span-1 relative">
              <h6 className="text-[16px] font-[400] font-Roboto mb-[5px] leading-[18.75px]">
                Contact Person
              </h6>
              <input
                type="text"
                name="contact_p_name"
                id="contact_p_name"
                value={payerCompany.contact_p_name}
                onChange={(e) => handleChange(e)}
                className={`block w-full text-black border border-[#D2D8DD] sm:text-sm sm:leading-4 p-2 bg-white rounded-sm ${
                  isValid && "pointer-events-none"
                }`}
                placeholder="Enter Contact Person Name"
              />
              {payerCompanyError?.contact_p_name && (
                <p className="text-[10px] text-[#ff0000] pt-1 absolute top-full">
                  {payerCompanyError.contact_p_name}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="text-right">
        <button
          disabled={loading2}
          className={`text-[16px] font-Roboto leading-[18px] font-[500] text-[#fff] py-[8px] px-[40px] bg-[#106FEC] rounded-[2px] w-[243px] flex items-center justify-center ml-auto ${
            loading2 && "opacity-70"
          }`}
          type="button"
          onClick={handleSave}
        >
          {loading2 ? (
            <span className="h-[18px] w-[18px] flex items-center justify-center">
              <LoaderIcon className="!w-[18px] !h-[18px]" />
            </span>
          ) : (
            "Send Performa Invoice"
          )}
        </button>
      </div>
    </div>
  );
};

export default AccountantCompanyDetails;

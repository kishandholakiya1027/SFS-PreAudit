import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import {
  UpdateExpense,
  getOneExpense,
} from "../store/action/AdminActions/ExpenseAction";
import { useDispatch, useSelector } from "react-redux";
import { SendInvoice } from "../store/action/AdminActions/SendDetailsAction";
import { LoaderIcon } from "react-hot-toast";
import ComboBox from "./common/ComboBox";

const SendInvoices = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [loading2, setLoading2] = useState(false);
  const [loading3, setLoading3] = useState(false);
  const { oneExpanse } = useSelector((state) => state.OneExpenceReducer);
  const [location, setLocation] = useState();
  const [btn, setBtn] = useState(true);
  const [inputData, setInputData] = useState({
    invoiceNo: "",
    amount: "",
    paidAmount: "",
    status: "",
  });
  const [error, setError] = useState({
    paidAmount: "",
  });
  const data = ["partially", "close", "cancel"];

  useEffect(() => {
    dispatch(getOneExpense(id, setLoading));
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputData((prev) => ({ ...prev, [name]: value }));
    if (name === "paidAmount") {
      if (!value) {
        setError((prev) => ({ ...prev, [name]: t("paidAmountError") }));
      } else if (value > inputData?.amount) {
        setError((prev) => ({ ...prev, [name]: t("validPaidAmountError") }));
      } else {
        if (JSON?.stringify(inputData?.amount) === value) {
          setLocation(data[1]);
        } else {
          setLocation(oneExpanse?.status);
        }
        setError((prev) => ({ ...prev, [name]: "" }));
      }
    }
  };

  const handleSave = () => {
    if (
      inputData.invoiceNo !== undefined &&
      inputData.amount !== undefined &&
      inputData.paidAmount !== undefined
    ) {
      setLoading2(true);
      dispatch(
        SendInvoice(oneExpanse.userid, setBtn, setLoading2, {
          id: id,
          status: inputData?.status,
        })
      );
    } else {
      setError((prev) => ({ ...prev, paidAmount: t("paidAmountError") }));
    }
  };

  const handleSave2 = () => {
    if (
      inputData.invoiceNo !== undefined &&
      inputData.amount !== undefined &&
      inputData.paidAmount !== undefined
    ) {
      setLoading3(true);
      const data = {
        paidAmount: JSON.parse(inputData?.paidAmount),
        status: inputData?.status,
      };
      dispatch(UpdateExpense(id, data, setLoading3));
    } else {
      setError((prev) => ({ ...prev, paidAmount: t("paidAmountError") }));
    }
  };

  useEffect(() => {
    setLocation(oneExpanse?.status);
    setInputData({
      invoiceNo: oneExpanse?.invoiceNo,
      amount: oneExpanse?.total,
      paidAmount: oneExpanse?.paidAmount,
    });
  }, [oneExpanse]);

  useEffect(() => {
    setInputData((v) => {
      return {
        ...v,
        status: location,
      };
    });
  }, [location]);

  return (
    <div className="h-full min-h-[calc(100vh-216px)]">
      {loading ? (
        <div className="flex items-center justify-center w-full h-full min-h-[calc(100vh-216px)]">
          <LoaderIcon className="!w-12 !h-12 !border-r-[#106FEC]" />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-3 gap-[30px]">
            <div className="col-span-1 flex flex-col gap-1">
              <label
                htmlFor="invoiceNo"
                className="text-[16px] font-Roboto font-[400]"
              >
                Invoice No
              </label>
              <input
                type="text"
                readOnly
                value={inputData?.invoiceNo}
                name="invoiceNo"
                id="invoiceNo"
                className="bg-[#F9FCFF] border-b outline-none py-[6px] text-[14px] font-Roboto"
                placeholder="2001A"
                onChange={handleChange}
              />
            </div>
            <div className="col-span-1 flex flex-col gap-1">
              <label
                htmlFor="invoiceNo"
                className="text-[16px] font-Roboto font-[400]"
              >
                Invoice Amount
              </label>
              <input
                type="text"
                readOnly
                value={inputData?.amount}
                name="amount"
                id="amount"
                className="bg-[#F9FCFF] border-b outline-none py-[6px] text-[14px] font-Roboto"
                placeholder="25960.00"
                onChange={handleChange}
              />
            </div>
            <div className="col-span-1 flex flex-col gap-1 relative">
              <label
                htmlFor="paid"
                className="text-[16px] font-Roboto font-[400]"
              >
                Invoice Paid
              </label>
              <input
                type="number"
                min={0}
                value={inputData?.paidAmount}
                name="paidAmount"
                id="invoiceNo"
                className="bg-[#F9FCFF] border-b outline-none py-[6px] text-[14px] font-Roboto"
                placeholder="25960.00"
                onChange={handleChange}
              />
              {error?.paidAmount && (
                <p className="text-[12px] text-[#B80404] pt-2 absolute top-full">
                  {error.paidAmount}
                </p>
              )}
            </div>
            <div className="col-span-1 flex flex-col gap-1 relative">
              <label
                htmlFor="status"
                className="text-[16px] font-Roboto font-[400]"
              >
                Status
              </label>
              <ComboBox
                id="status"
                option={data}
                value={location || "Select"}
                setLocation={setLocation}
                location={location}
              />
            </div>
          </div>
          <div className="mt-[37px]">
            {btn ? (
              <button
                className={`text-[16px] w-[214px] font-Roboto font-[500] leading-[18px] flex justify-center items-center text-[#fff] py-[8px] px-[40px] bg-[#106FEC] rounded-[2px] ${
                  loading2 && "opacity-70"
                }`}
                type="button"
                disabled={loading2}
                onClick={handleSave}
              >
                {loading2 ? (
                  <LoaderIcon className="!w-[18px] !h-[18px]" />
                ) : (
                  "Send Tax Invoice"
                )}
              </button>
            ) : (
              <button
                className={`text-[16px] font-Roboto w-[115px] flex justify-center items-center font-[500] leading-[18px] text-[#fff] py-[8px] px-[40px] bg-[#106FEC] rounded-[2px] ${
                  loading3 && "opacity-70"
                }`}
                type="button"
                disabled={loading3}
                onClick={handleSave2}
              >
                {loading3 ? (
                  <LoaderIcon className="!w-[18px] !h-[18px]" />
                ) : (
                  "Save"
                )}
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default SendInvoices;

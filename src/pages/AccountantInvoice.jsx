import { useEffect, useState } from "react";
import Sort from "../assets/images/Vector.svg";
import Invoice from "../assets/images/Group.svg";
import Edit from "../assets/images/Edit.svg";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOneExpense } from "../store/action/AdminActions/ExpenseAction";
import { GetPayerCompanyById } from "../store/action/manageAction";
import { LoaderIcon } from "react-hot-toast";

const AccountantInvoice = () => {
  const { id } = useParams();
  const { oneExpanse } = useSelector((state) => state.OneExpenceReducer);
  const [loading, setLoading] = useState(true);
  let [invoice, setInvoice] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOneExpense(id, setLoading));
  }, [dispatch]);

  useEffect(() => {
    oneExpanse.userid && dispatch(GetPayerCompanyById(oneExpanse?.userid));
  }, [dispatch, oneExpanse]);

  useEffect(() => {
    setInvoice(oneExpanse);
  }, [oneExpanse]);

  return (
    <div className="flex flex-col justify-between items-end h-[calc(100vh-216px)]">
      {loading ? (
        <div className="flex items-center justify-center w-full h-full">
          <LoaderIcon className="!w-12 !h-12 !border-r-[#106FEC]" />
        </div>
      ) : (
        <div className="w-full">
          <div className="w-full flex justify-end mb-[25px]">
            <img src={Invoice} alt="" className="mr-2" />
            <p className="text-[16px] font-[500] leading-[18.75px] font-Roboto text-[#106FEC]">
              Invoice{" "}
            </p>
          </div>
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-[#D2D8DD]">
                <th className="text-left text-[14px] text-[#000] font-Roboto font-[500] pb-[18px]">
                  <div className="flex items-center gap-1">
                    Item <img src={Sort} alt="Sort" />
                  </div>
                </th>
                <th className="text-left text-[14px] text-[#000] font-Roboto font-[500] pb-[18px]">
                  <div className="flex items-center gap-1">
                    Particular <img src={Sort} alt="Sort" />
                  </div>
                </th>
                <th className="text-left text-[14px] text-[#000] font-Roboto font-[500] pb-[18px]">
                  <div className="flex items-center gap-1">
                    QTY <img src={Sort} alt="Sort" />
                  </div>
                </th>
                <th className="text-left text-[14px] text-[#000] font-Roboto font-[500] pb-[18px]">
                  <div className="flex items-center gap-1">
                    Price <img src={Sort} alt="Sort" />
                  </div>
                </th>
                <th className="text-left text-[14px] text-[#000] font-Roboto font-[500] pb-[18px]">
                  <div className="flex items-center gap-1">
                    Amount <img src={Sort} alt="Sort" />
                  </div>
                </th>
                <th className="text-left text-[14px] text-[#000] font-Roboto font-[500] pb-[18px]"></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-[18px] text-[14px] text-[#000] font-Roboto font-[300]">
                  {invoice?.item}
                </td>
                <td className="py-[18px] text-[14px] text-[#000] font-Roboto font-[300]">
                  {invoice?.particular}
                </td>
                <td className="py-[18px] text-[14px] text-[#000] font-Roboto font-[300]">
                  {invoice?.qty}
                </td>
                <td className="py-[18px] text-[14px] text-[#000] font-Roboto font-[300]">
                  {invoice?.price?.toFixed(2)}
                </td>
                <td className="py-[18px] text-[14px] text-[#000] font-Roboto font-[300]">
                  {invoice?.total?.toFixed(2)}
                </td>
                <td className="py-[18px] text-[14px] text-[#000] font-Roboto font-[300]">
                  <img src={Edit} alt="edit" className="text-[18px]" />
                </td>
              </tr>
              <tr>
                <td className="py-[5px] text-[14px] text-[#000] font-Roboto font-[300]">
                  TAX (2342542542)
                </td>
              </tr>
              <tr>
                <td
                  className="py-[5px] text-[14px] text-[#000] font-Roboto font-[300]"
                  colSpan={4}
                >
                  + SGST
                </td>
                <td className="py-[5px] text-[14px] text-[#000] font-Roboto font-[300]">
                  {invoice?.sgst?.toFixed(2) || "1000.00"}
                </td>
              </tr>
              <tr>
                <td
                  className="py-[5px] text-[14px] text-[#000] font-Roboto font-[300]"
                  colSpan={4}
                >
                  + CGST
                </td>
                <td className="py-[5px] text-[14px] text-[#000] font-Roboto font-[300]">
                  {invoice?.cgst?.toFixed(2) || "1000.00"}
                </td>
              </tr>
              <tr>
                <td
                  className="py-[18px] text-[14px] text-[#000] font-Roboto font-[500]"
                  colSpan={3}
                >
                  Total
                </td>
                <td className="py-[18px] text-[14px] text-[#000] font-Roboto font-[500]">
                  {invoice?.price?.toFixed(2)}
                </td>
                <td className="py-[18px] text-[14px] text-[#000] font-Roboto font-[500]">
                  {(invoice?.total + 2000.0)?.toFixed(2)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
      <button
        className="text-[16px] font-Roboto font-[500] text-[#fff] py-[8px] leading-[18px] px-[40px] bg-[#106FEC] rounded-[2px]"
        type="button"
        onClick={() => {
          navigate(
            `/pre_audit/project/${oneExpanse?.userid}/companydetails?id=${oneExpanse?.id}`
          );
        }}
      >
        Next
      </button>
    </div>
  );
};

export default AccountantInvoice;

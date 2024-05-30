import { toast } from "react-hot-toast";
import { api } from "../../../axios/api";
import { EXPENSE_FAIL } from "../../actionType";

export const SendLoginDetail = (id, navigate, setLoading2, data) => {
  return async (dispatch) => {
    try {
      const ExpenseData = await api(`/client/send_details/${id}`, "post", data);
      if (ExpenseData.status === 200) {
        toast.success(ExpenseData.data.message);
        setLoading2(false);
        navigate("/pre_audit/sent_invoices", { state: { activeTab: "2" } });
      }
    } catch (error) {
      setLoading2(false);
      toast.error(error.response.data.message);
      dispatch({ type: EXPENSE_FAIL, payload: error.response.data.message });
    }
  };
};

export const SendInvoice = (id, setBtn, setLoading2, data) => {
  return async (dispatch) => {
    try {
      const ExpenseData = await api(`/client/send_invoice/${id}`, "post", data);
      if (ExpenseData.status === 200) {
        setBtn(false);
        setLoading2(false);
        toast.success(ExpenseData.data.message);
      }
    } catch (error) {
      setLoading2(false);
      toast.error(error.response.data.message);
      dispatch({ type: EXPENSE_FAIL, payload: error.response.data.message });
    }
  };
};

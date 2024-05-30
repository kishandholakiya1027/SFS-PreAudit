import toast from "react-hot-toast";
import { api } from "../../axios/api";
import { QUERY_FAIL, QUERY_SUCCESS } from "../actionType";

export const addQuery = (data, setLoading, handleClose, setComment) => {
  return async (dispatch) => {
    try {
      const CurrencyData = await api(`/query/add`, "post", data);
      if (CurrencyData.status === 200) {
        setLoading(false);
        handleClose();
        setComment("");
        dispatch({ type: QUERY_SUCCESS, payload: CurrencyData.data.data });
        toast.success("Query send successfully");
      }
    } catch (error) {
      dispatch({ type: QUERY_FAIL, payload: error.response.data.message });
    }
  };
};

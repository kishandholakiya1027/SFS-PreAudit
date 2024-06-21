import toast from "react-hot-toast";
import { api } from "../../axios/api";
import { ONE_AUDIT_FAIL, ONE_AUDIT_SUCCESS } from "../actionType";

export const addDocData = (
  payload,
  setLoading2,
  navigate,
  id,
  unit,
  length
) => {
  return async (dispatch) => {
    try {
      const CurrencyData = await api(`/pre_audit/create`, "post", payload);
      if (CurrencyData.status === 200) {
        setLoading2(false);
        toast.success("Document added successfully");
        if (unit < length) {
          navigate("/pre_audit/project/" + id + "/review?unit=" + (+unit + 1));
        } else {
          navigate("/pre_audit/project/" + id + "/ncr");
        }
      }
    } catch (error) {
      console.log("Error:", error);
      setLoading2(false);
      toast.error(error?.message);
    }
  };
};

export const getOneAudit = (setIsLoading3, id) => {
  return async (dispatch) => {
    try {
      const CurrencyData = await api(`/pre_audit/one?id=${id}`, "get");
      if (CurrencyData.status === 200) {
        setIsLoading3(false);
        dispatch({ type: ONE_AUDIT_SUCCESS, payload: CurrencyData.data.data });
      }
    } catch (error) {
      setIsLoading3(false);
      dispatch({
        type: ONE_AUDIT_FAIL,
        payload: error?.message,
      });
    }
  };
};

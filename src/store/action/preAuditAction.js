import toast from "react-hot-toast";
import { api } from "../../axios/api";
import { ONE_AUDIT_FAIL, ONE_AUDIT_SUCCESS } from "../actionType";

export const addDocData = (payload, setLoading, navigate, id) => {
  return async (dispatch) => {
    try {
      const CurrencyData = await api(`/pre_audit/create`, "post", payload);
      if (CurrencyData.status === 200) {
        setLoading(false);
        toast.success("Document added successfully");
        if (payload.name === "Organization") {
          navigate("/pre_audit/project/" + id + "/review/chain_of_custody");
        } else if (payload.name === "Chain of Custody") {
          navigate("/pre_audit/project/" + id + "/review/environmental");
        } else if (payload.name === "Environmental") {
          navigate("/pre_audit/project/" + id + "/review/social_and_labour");
        } else {
          navigate("/pre_audit/project/" + id + "/scheduling/company_details");
        }
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error(error.response.data.message);
    }
  };
};

export const getOneAudit = (setLoading, id, name) => {
  return async (dispatch) => {
    try {
      const CurrencyData = await api(
        `/pre_audit/one?id=${id}&name=${name}`,
        "get"
      );
      if (CurrencyData.status === 200) {
        setLoading(false);
        dispatch({ type: ONE_AUDIT_SUCCESS, payload: CurrencyData.data.data });
      }
    } catch (error) {
      setLoading(false);
      dispatch({
        type: ONE_AUDIT_FAIL,
        payload: error?.response?.data?.message,
      });
    }
  };
};

import { toast } from "react-hot-toast";
import { api } from "../../../axios/api";
import { COMPANY_FAIL, COMPANY_SUCCESS } from "../../actionType";

export const GetCompanys = () => {
  return async (dispatch) => {
    try {
      const MemberData = await api(`/newcompanydata`, "get");
      if (MemberData.status === 200) {
        dispatch({ type: COMPANY_SUCCESS, payload: MemberData.data.data });
      }
    } catch (error) {
      dispatch({ type: COMPANY_FAIL, payload: error.response.data.message });
    }
  };
};

export const PostCompanys = (user) => {
  return async (dispatch) => {
    try {
      const MemberData = await api(`/addnewcompany`, "post", user);
      if (MemberData.status === 200) {
        toast.success("Company Added Successfully.");
        dispatch(GetCompanys());
      }
    } catch (error) {
      toast.error(error.response.data.message);
      dispatch({ type: COMPANY_FAIL, payload: error.response.data.message });
    }
  };
};

export const AuditDataFilter = (user) => {
  return api(`/auditdatafilter`, "post", user);
};

export const ClientDataFilter = (user) => {
  return api(`/clientdatafilter`, "post", user);
};

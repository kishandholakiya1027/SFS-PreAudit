import { toast } from "react-hot-toast";
import { api } from "../../../axios/api";
import {
  MEMBER_FAIL,
  MEMBERROLE_FAIL,
  MEMBER_SUCCESS,
  MEMBERROLE_SUCCESS,
} from "../../actionType";

export const GetMembersByRole = (role) => {
  return async (dispatch) => {
    try {
      const MemberData = await api(`/member/role/${role}`, "get");
      if (MemberData.status === 200) {
        dispatch({ type: MEMBERROLE_SUCCESS, payload: MemberData.data.data });
      }
    } catch (error) {
      dispatch({ type: MEMBERROLE_FAIL, payload: error.response.data.message });
    }
  };
};

export const GetMembers = (setLoading) => {
  return async (dispatch) => {
    try {
      const MemberData = await api(`/member/all`, "get");
      if (MemberData.status === 200) {
        setLoading(false);
        dispatch({ type: MEMBER_SUCCESS, payload: MemberData.data.data });
      }
    } catch (error) {
      setLoading(false);
      dispatch({ type: MEMBER_FAIL, payload: error?.message });
    }
  };
};

export const adminLogin = (user, navigate, setLoading) => {
  return async (dispatch) => {
    try {
      const MemberData = await api(`/admin/pre_auditor/login`, "post", user);
      if (MemberData.status === 200) {
        if (MemberData.data.data.role === "Pre Audit Review") {
          localStorage.setItem(
            "accessToken",
            JSON.stringify(MemberData.data.data.token.accessToken)
          );
          localStorage.setItem(
            "refreshToken",
            JSON.stringify(MemberData.data.data.token.refreshToken)
          );
          localStorage.setItem(
            "deviceid",
            JSON.stringify(MemberData.data.data.token.deviceid)
          );
          localStorage.setItem(
            "admin",
            JSON.stringify({
              id: MemberData.data.data.id,
              name: MemberData.data.data.name,
              email: MemberData.data.data.email,
            })
          );
          setLoading(false);
          navigate("/pre_audit/dashboard");
          toast.success("Pre audit login successfully");
        } else {
          setLoading(false);
          toast.error("Wrong credentials");
        }
      }
    } catch (error) {
      setLoading(false);
      if (error?.message) {
        toast.error(error?.message);
      }
      dispatch({ type: MEMBER_FAIL, payload: error?.response?.data?.message });
    }
  };
};

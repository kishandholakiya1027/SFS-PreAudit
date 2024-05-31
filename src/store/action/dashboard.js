import { api } from "../../axios/api";
import { DASHBOARD_FAIL, DASHBOARD_SUCCESS } from "../actionType";

export const dashboardData = (setLoading) => {
  return async (dispatch) => {
    try {
      const dashboardData = await api(`/dashboard/pre_audit`, "get");
      if (dashboardData.status === 200) {
        setLoading(false);
        dispatch({
          type: DASHBOARD_SUCCESS,
          payload: dashboardData.data.data,
        });
      }
    } catch (error) {
      setLoading(false);
      console.log("Error:", error);
      dispatch({ type: DASHBOARD_FAIL, payload: error?.message });
    }
  };
};

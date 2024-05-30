import { api } from "../../axios/api";
import { REGISTER_FAIL, REGISTER_SUCCESS } from "../actionType";

export const GetUser = () => {
  return async (dispatch) => {
    try {
      const CurrencyData = await api(`/user/all`, "get");
      if (CurrencyData.status === 200) {
        dispatch({ type: REGISTER_SUCCESS, payload: CurrencyData.data.data });
      }
    } catch (error) {
      dispatch({
        type: REGISTER_FAIL,
        payload: error?.response?.data?.message,
      });
    }
  };
};

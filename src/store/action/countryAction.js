import { api } from "../../axios/api";
import { COUNTRY_FAIL, COUNTRY_SUCCESS } from "../actionType";

export const GetCountry = () => {
  return async (dispatch) => {
    try {
      const CurrencyData = await api(`/country/all`, "get");
      if (CurrencyData.status === 200) {
        dispatch({ type: COUNTRY_SUCCESS, payload: CurrencyData.data.data });
      }
    } catch (error) {
      dispatch({ type: COUNTRY_FAIL, payload: error.response.data.message });
    }
  };
};

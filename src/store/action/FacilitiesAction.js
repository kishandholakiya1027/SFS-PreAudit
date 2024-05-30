import { api } from "../../axios/api";
import { toast } from "react-hot-toast";
import { FACILITIES_FAIL, FACILITIES_SUCCESS } from "../actionType";

export const GetFacilities = () => {
  return async (dispatch) => {
    try {
      const CurrencyData = await api(`/facility/all`, "get");
      if (CurrencyData.status === 200) {
        dispatch({ type: FACILITIES_SUCCESS, payload: CurrencyData.data.data });
      }
    } catch (error) {
      dispatch({ type: FACILITIES_FAIL, payload: error.response.data.message });
    }
  };
};

export const AddFacilities = (data) => {
  return async (dispatch) => {
    try {
      const CurrencyData = await api(`/addfacilities`, "post", data);
      if (CurrencyData.status === 200) {
        toast.success("Successfully Added.");
        dispatch(GetFacilities());
      }
    } catch (error) {
      toast.error("Something Wrong");
      dispatch({ type: FACILITIES_FAIL, payload: error.response.data.message });
    }
  };
};

export const DeleteFacilities = (data) => {
  return async (dispatch) => {
    try {
      const CurrencyData = await api(`/deletefacilities`, "delete", data);
      if (CurrencyData.status === 200) {
        toast.success(CurrencyData.data.message);
        dispatch(GetFacilities());
      }
    } catch (error) {
      toast.error("Something Wrong");
      dispatch({ type: FACILITIES_FAIL, payload: error.response.data.message });
    }
  };
};

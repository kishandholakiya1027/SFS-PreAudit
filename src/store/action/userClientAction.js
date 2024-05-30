import { toast } from "react-hot-toast";
import { api } from "../../axios/api";
import { USER_C_FAIL, USER_C_SUCCESS } from "../actionType";

export const GetUserClient = () => {
  return async (dispatch) => {
    try {
      const CurrencyData = await api(`/client_user/all`, "get");
      if (CurrencyData.status === 200) {
        dispatch({ type: USER_C_SUCCESS, payload: CurrencyData.data.data });
      }
    } catch (error) {
      dispatch({ type: USER_C_FAIL, payload: error.response.data.message });
    }
  };
};

export const AddUserClient = (data) => {
  return async (dispatch) => {
    try {
      const CurrencyData = await api(`/addclientuser`, "post", data);
      if (CurrencyData.status === 200) {
        toast.success("Successfully Added.");
        dispatch(GetUserClient());
      }
    } catch (error) {
      toast.error("Something Wrong");
      dispatch({ type: USER_C_FAIL, payload: error.response.data.message });
    }
  };
};

export const DeleteUserClient = (data) => {
  return async (dispatch) => {
    try {
      const CurrencyData = await api(`/deleteclientuser`, "delete", data);
      if (CurrencyData.status === 200) {
        toast.success(CurrencyData.data.message);
        dispatch(GetUserClient());
      }
    } catch (error) {
      toast.error("Something Wrong");
      dispatch({ type: USER_C_FAIL, payload: error.response.data.message });
    }
  };
};

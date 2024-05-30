import toast from "react-hot-toast";
import { api } from "../../../axios/api";
import { TYPEOFPRODUCT_FAIL, TYPEOFPRODUCT_SUCCESS } from "../../actionType";
import { updateCurrentStep } from "../CurrentStep";

export const GetTypeOfProduct = (id) => {
  return async (dispatch) => {
    try {
      const ModuleData = await api(`/gettypeofpost/${id}`, "get");
      if (ModuleData.status === 200) {
        dispatch({
          type: TYPEOFPRODUCT_SUCCESS,
          payload: ModuleData.data.data,
        });
      }
    } catch (error) {
      dispatch({
        type: TYPEOFPRODUCT_FAIL,
        payload: error.response.data.message,
      });
    }
  };
};

export const PostTypeOfProduct = (data) => {
  return async (dispatch) => {
    try {
      const ModuleData = await api(`/typeofpost`, "post", data);
      if (ModuleData.status === 200) {
        dispatch(GetTypeOfProduct(data.userid));
        const payload = {
          userid: data.userid,
          step: 2,
        };
        dispatch(updateCurrentStep(payload));
      }
    } catch (error) {
      toast.error("Something Wrong");
      dispatch({ type: TYPEOFPRODUCT_FAIL, payload: error });
    }
  };
};

export const UpdateTypeOfProduct = (data, id) => {
  return async (dispatch) => {
    try {
      const ModuleData = await api(`/updatetypeofpost/${id}`, "post", data);
      if (ModuleData.status === 200) {
        dispatch(GetTypeOfProduct(data.userid));
      }
    } catch (error) {
      toast.error("Something Wrong");
      dispatch({
        type: TYPEOFPRODUCT_FAIL,
        payload: error.response.data.message,
      });
    }
  };
};

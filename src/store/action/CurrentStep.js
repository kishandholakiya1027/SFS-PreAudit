import { api } from "../../axios/api";
import { GET_STEP_SUCCESS, GET_STEP_FAIL } from "../actionType";

export const updateCurrentStep = (data) => {
  return async (dispatch) => {
    try {
      const steps = await api(`/currentsteps`, "post", data);
      if (steps.status === 200) {
        getCurrentStep(data?.userid);
      }
    } catch (error) {}
  };
};

export const getCurrentStep = (id) => {
  return async (dispatch) => {
    try {
      const steps = await api(`/getcurrentsteps/${id}`, "get");
      if (steps.status === 200) {
        dispatch({ type: GET_STEP_SUCCESS, payload: steps.data.data });
      }
    } catch (error) {
      dispatch({ type: GET_STEP_FAIL, payload: error.response.data.message });
    }
  };
};

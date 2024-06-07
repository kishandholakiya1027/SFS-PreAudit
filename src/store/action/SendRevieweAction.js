import { toast } from "react-hot-toast";
import { api } from "../../axios/api";
import {
  CLIENTDATA_FAIL,
  CLIENTDATA_SUCCESS,
  SEND_REVIEWE_SUCCESS,
  SEND_REVIEWE__FAIL,
} from "../actionType";
import { updateCurrentStep } from "./CurrentStep";

export const GetReviewe = (setLoading) => {
  return async (dispatch) => {
    try {
      const CurrencyData = await api(`/client/all`, "get");

      if (CurrencyData.status === 200) {
        setLoading(false);
        dispatch({
          type: SEND_REVIEWE_SUCCESS,
          payload: CurrencyData.data.data,
        });
      }
    } catch (error) {
      setLoading(false);
      dispatch({
        type: SEND_REVIEWE__FAIL,
        payload: error.response.data.message,
      });
    }
  };
};

export const GetRevieweWithFilter = (filter, setLoading) => {
  return async (dispatch) => {
    try {
      const CurrencyData = await api(`/client/all?${filter}`, "get");

      if (CurrencyData.status === 200) {
        setLoading(false);
        dispatch({
          type: SEND_REVIEWE_SUCCESS,
          payload: CurrencyData.data.data,
        });
      }
    } catch (error) {
      setLoading(false);
      dispatch({
        type: SEND_REVIEWE_FAIL,
        payload: error.response.data.message,
      });
    }
  };
};

export const GetClientDataRevieweById = (id) => {
  return async (dispatch) => {
    try {
      const ClientData = await api(`/client/reviewer/${id}`, "get");
      if (ClientData.status === 200) {
        dispatch({ type: CLIENTDATA_SUCCESS, payload: ClientData.data.data });
      }
    } catch (error) {
      dispatch({ type: CLIENTDATA_FAIL, payload: error.response.data.message });
    }
  };
};

export const GetRevieweById = async (id) => {
  try {
    const CurrencyData = await api(`/getclientdata/${id}`, "get");

    if (CurrencyData.status === 200) {
      return CurrencyData.data.data[0];
    }
  } catch (error) {
    console.log("ERROR:", error);
  }
};

export const DeleteRevieweById = async (id, dispatch) => {
  try {
    const CurrencyData = await api(`/deleteclientdata/${id}`, "delete");

    if (CurrencyData.status === 200) {
      dispatch(GetReviewe());
      toast.success("Data delete successfully.");
    }
  } catch (error) {
    console.log("ERROR:", error);
  }
};

export const SendReviewe = (data, Navigate, setIsSubmit) => {
  return async (dispatch) => {
    try {
      const CurrencyData = await api(`/sendreviewer`, "post", data);
      if (CurrencyData.status === 200) {
        dispatch(GetReviewe());
        setIsSubmit(true);
      }
    } catch (error) {
      toast.error("Something Wrong");
      dispatch({
        type: SEND_REVIEWE__FAIL,
        payload: error.response.data.message,
      });
    }
  };
};

export const ApproveData = (data, setIsLoading, setActiveTab, setStep) => {
  return async (dispatch) => {
    try {
      const CurrencyData = await api(`/approveclient`, "post", data);
      if (CurrencyData.status === 200) {
        toast.success(CurrencyData.data.message);
        setIsLoading(false);
        setActiveTab("2");
        setStep(0);
        const payload = {
          userid: data.id,
          step: 5,
          isStep: false,
        };
        dispatch(updateCurrentStep(payload));
      }
    } catch (error) {
      setIsLoading(false);
      toast.error(error.response.data.message);
    }
  };
};

export const UpdateClientData = (id) => {
  return async (dispatch) => {
    try {
      const CurrencyData = await api(`/updateclientdata/${id}`, "patch");
      if (CurrencyData.status === 200) {
        toast.success(CurrencyData.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
};

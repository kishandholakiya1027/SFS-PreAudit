import { toast } from "react-hot-toast";
import { api } from "../../axios/api";
import {
  CLIENT_FAIL,
  CLIENT_SUCCESS,
  MANAGE_FAIL,
  MANAGE_SUCCESS,
  PAYER_FAIL,
  PAYER_SUCCESS,
} from "../actionType";
import { updateCurrentStep } from "./CurrentStep";
import { GetReviewe } from "./SendRevieweAction";

export const GetClientInfo = () => {
  return async (dispatch) => {
    try {
      const CurrencyData = await api(`/client_info/all`, "get");
      if (CurrencyData.status === 200) {
        dispatch({ type: CLIENT_SUCCESS, payload: CurrencyData.data.data });
      }
    } catch (error) {
      dispatch({ type: CLIENT_FAIL, payload: error?.response?.data?.message });
    }
  };
};

export const GetOneClientInfo = (id, setLoading) => {
  return async (dispatch) => {
    try {
      const CurrencyData = await api(`/client_info/one/${id}`, "get");
      if (CurrencyData.status === 200) {
        setLoading(false);
        dispatch({ type: CLIENT_SUCCESS, payload: CurrencyData.data.data });
      }
    } catch (error) {
      setLoading(false);
      dispatch({ type: CLIENT_FAIL, payload: error?.response?.data?.message });
    }
  };
};

export const PostClientInfo = (user) => {
  return async (dispatch) => {
    try {
      const CurrencyData = await api(`/addclient`, "post", user);
      if (CurrencyData.status === 200) {
        const payload = {
          userid: CurrencyData.data.data.userid,
          step: 1,
          isStep: true,
        };
        dispatch(updateCurrentStep(payload));
        dispatch(GetClientInfo());
      }
    } catch (error) {
      toast.error(error.response.data.message);
      dispatch({ type: CLIENT_FAIL, payload: error.response.data.message });
    }
  };
};

export const PostPayerCompany = (data) => {
  return async (dispatch) => {
    try {
      const PayerData = await api(`/addpayercompany`, "post", data);
      if (PayerData.status === 200) {
        toast.success("Created Successfully");
      }
    } catch (error) {
      dispatch({ type: CLIENT_FAIL, payload: error });
    }
  };
};

export const UpdateClientInfo = (user, id) => {
  return async (dispatch) => {
    try {
      const CurrencyData = await api(`/updateclient/${id}`, "patch", user);
      if (CurrencyData.status === 200) {
        dispatch(GetReviewe());
      }
    } catch (error) {
      dispatch({ type: CLIENT_FAIL, payload: error });
    }
  };
};

export const UpdatePaymentInfo = (user, id, navigate) => {
  return async (dispatch) => {
    try {
      const CurrencyData = await api(`/updateclient/${id}`, "patch", user);
      if (CurrencyData.status === 200) {
        dispatch(GetClientInfo());
        const payload = {
          userid: id,
          step: 2,
        };
        dispatch(updateCurrentStep(payload));
        navigate("/payer-info");
      }
    } catch (error) {
      dispatch({ type: CLIENT_FAIL, payload: error?.response?.data?.message });
    }
  };
};

export const GetPayerInfo = () => {
  return async (dispatch) => {
    try {
      const CurrencyData = await api(`/getpayerclient`, "get");
      if (CurrencyData.status === 200) {
        dispatch({ type: PAYER_SUCCESS, payload: CurrencyData.data.data });
      }
    } catch (error) {
      dispatch({ type: PAYER_FAIL, payload: error.response.data.message });
    }
  };
};

export const GetPayerCompany = () => {
  return async (dispatch) => {
    try {
      const CurrencyData = await api(`/payer_company/all`, "get");
      if (CurrencyData.status === 200) {
        dispatch({ type: PAYER_SUCCESS, payload: CurrencyData.data.data });
      }
    } catch (error) {
      dispatch({ type: PAYER_FAIL, payload: error.response.data.message });
    }
  };
};

export const GetPayerInfoById = (id) => {
  return async (dispatch) => {
    try {
      const CurrencyData = await api(`/getpayerclient/${id}`, "get");
      if (CurrencyData.status === 200) {
        dispatch({ type: PAYER_SUCCESS, payload: CurrencyData.data.data });
      }
    } catch (error) {
      dispatch({ type: PAYER_FAIL, payload: error.response.data.message });
    }
  };
};

export const GetPayerCompanyById = (id, setLoading) => {
  return async (dispatch) => {
    try {
      const CurrencyData = await api(`/payer_company/one/${id}`, "get");
      if (CurrencyData.status === 200) {
        setLoading(false);
        dispatch({ type: PAYER_SUCCESS, payload: CurrencyData.data.data });
      }
    } catch (error) {
      dispatch({ type: PAYER_FAIL, payload: error.response.data.message });
    }
  };
};

export const UpdatePayerInfoById = (id, data, setStep) => {
  return async (dispatch) => {
    try {
      const CurrencyData = await api(
        `/updateLocationProccessData/${id}`,
        "post",
        data
      );
      if (CurrencyData.status === 200) {
        setStep(3);
      }
    } catch (error) {
      dispatch({ type: PAYER_FAIL, payload: error.response.data.message });
    }
  };
};

export const PostPayerInfo = (user) => {
  return async (dispatch) => {
    try {
      const CurrencyData = await api(`/addLocationProccessData`, "post", user);
      if (CurrencyData.status === 200) {
        const payload = {
          userid: user.userid,
          step: 3,
        };
        dispatch(updateCurrentStep(payload));
        dispatch(GetPayerInfo());
      }
    } catch (error) {
      toast.error(error.response.data.message);
      dispatch({ type: PAYER_FAIL, payload: error.response.data.message });
    }
  };
};

export const PostCertificationStatus = (user) => {
  return async (dispatch) => {
    try {
      const CurrencyData = await api(
        `/addCertificationStatusData`,
        "post",
        user
      );
      if (CurrencyData.status === 200) {
        const payload = {
          userid: user.userid,
          step: 4,
        };
        dispatch(updateCurrentStep(payload));
        dispatch(GetPayerInfo());
      }
    } catch (error) {
      toast.error(error.response.data.message);
      dispatch({ type: MANAGE_FAIL, payload: error.response.data.message });
    }
  };
};

export const UpdateCertificationStatus = (user) => {
  return async (dispatch) => {
    try {
      const CurrencyData = await api(
        `/addCertificationStatusData`,
        "post",
        user
      );
      if (CurrencyData.status === 200) {
        const payload = {
          userid: user.userid,
          step: 4,
        };
        dispatch(updateCurrentStep(payload));
        dispatch(GetPayerInfo());
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
      dispatch({ type: MANAGE_FAIL, payload: error.response.data.message });
    }
  };
};

export const GetCertificationStatusById = (id) => {
  return async (dispatch) => {
    try {
      const CurrencyData = await api(`/certification_status/user/${id}`, "get");
      if (CurrencyData.status === 200) {
        dispatch({ type: MANAGE_SUCCESS, payload: CurrencyData.data.data });
      }
    } catch (error) {
      dispatch({ type: MANAGE_FAIL, payload: error.response.data.message });
    }
  };
};

export const UpdatePayerInfo = (user, id) => {
  return async (dispatch) => {
    try {
      const CurrencyData = await api(`/updateclient/${id}`, "patch", user);
      if (CurrencyData.status === 200) {
        dispatch(GetPayerInfo());
      }
    } catch (error) {
      dispatch({ type: PAYER_FAIL, payload: error.response.data.message });
    }
  };
};

export const AssignData = (payload) => {
  return async (dispatch) => {
    try {
      const CurrencyData = await api(`/assignReviewerdata`, "post", payload);
      if (CurrencyData.status === 200) {
        toast.success(CurrencyData.data.message);
        dispatch(GetReviewe());
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };
};

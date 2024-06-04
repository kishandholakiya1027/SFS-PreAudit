import { toast } from "react-hot-toast";
import { api } from "../../../axios/api";
import { AUDIT_FAIL, AUDIT_SUCCESS } from "../../actionType";

export const GetAuditorScedule = () => {
  return async (dispatch) => {
    try {
      const AuditorSceduleData = await api(`/get_auditorSchedule`, "get");
      if (AuditorSceduleData.status === 200) {
        dispatch({
          type: AUDIT_SUCCESS,
          payload: AuditorSceduleData.data.data,
        });
      }
    } catch (error) {
      dispatch({ type: AUDIT_FAIL, payload: error?.response?.data?.message });
    }
  };
};

export const getAuditorScheduleByUserId = (id) => {
  return async (dispatch) => {
    try {
      const AuditorSceduleData = await api(`/audit_schedule/user/${id}`, "get");
      if (AuditorSceduleData.status === 200) {
        dispatch({
          type: AUDIT_SUCCESS,
          payload: AuditorSceduleData.data.data,
        });
      }
    } catch (error) {
      dispatch({ type: AUDIT_FAIL, payload: error?.message });
    }
  };
};

export const PostAuditorScedule = (data, setLoading) => {
  return async (dispatch) => {
    try {
      const AuditorSceduleData = await api(`/audit_schedule/add`, "post", data);
      if (AuditorSceduleData.status === 200) {
        setLoading(false);
        toast.success("Audit schedule successfully");
      }
    } catch (error) {
      setLoading(false);
      toast.error(error?.message);
      dispatch({ type: AUDIT_FAIL, payload: error?.message });
    }
  };
};

export const UpdateAuditorScedule = (data, id) => {
  return async (dispatch) => {
    try {
      const AuditorSceduleData = await api(
        `/update_auditorSchedule/${id}`,
        "patch",
        data
      );
      if (AuditorSceduleData.status === 200) {
        dispatch(GetAuditorScedule());
        toast.success("Audit Schedule Update Successfully");
      }
    } catch (error) {
      dispatch({ type: AUDIT_FAIL, payload: error });
    }
  };
};

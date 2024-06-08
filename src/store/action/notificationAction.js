import { api } from "../../axios/api";
import {
  NOTIFICATION_FAIL,
  NOTIFICATION_SUCCESS,
  NOTIFICATIONS_FAIL,
  NOTIFICATIONS_SUCCESS,
} from "../actionType";

export const addNotification = (data, socket) => {
  return async (dispatch) => {
    try {
      const res = await api(`/notification/add`, "post", data);
      if (res.status === 200) {
        socket.emit("send_message", res.data.data);
        dispatch({ type: NOTIFICATION_SUCCESS, payload: res.data.data });
      }
    } catch (error) {
      dispatch({ type: NOTIFICATION_FAIL, payload: error?.message });
    }
  };
};

export const getNotificationByUser = (id) => {
  return async (dispatch) => {
    try {
      const res = await api(`/notification/user/${id}`, "get");
      if (res.status === 200) {
        dispatch({ type: NOTIFICATIONS_SUCCESS, payload: res.data.data });
      }
    } catch (error) {
      dispatch({ type: NOTIFICATIONS_FAIL, payload: error?.message });
    }
  };
};

export const editNotifications = (data, id) => {
  return async (dispatch) => {
    try {
      await api(`/notification/edit`, "patch", { data });
      dispatch(getNotificationByUser(id));
    } catch (error) {
      console.log("error", error);
    }
  };
};

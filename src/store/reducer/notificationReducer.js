import { NOTIFICATION_FAIL, NOTIFICATION_SUCCESS } from "../actionType";

const initialState = {
  notification: null,
  error: null,
};

export const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case NOTIFICATION_SUCCESS:
      return {
        ...state,
        notification: action.payload,
        error: null,
      };

    case NOTIFICATION_FAIL:
      return {
        ...state,
        notification: null,
        error: action.payload,
      };

    default:
      return state;
  }
};

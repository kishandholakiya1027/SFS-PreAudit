import { NOTIFICATIONS_FAIL, NOTIFICATIONS_SUCCESS } from "../actionType";

const initialState = {
  notifications: [],
  error: null,
};

export const notificationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        notifications: action.payload,
        error: null,
      };

    case NOTIFICATIONS_FAIL:
      return {
        ...state,
        notifications: [],
        error: action.payload,
      };

    default:
      return state;
  }
};

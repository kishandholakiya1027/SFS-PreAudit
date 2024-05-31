import { DASHBOARD_FAIL, DASHBOARD_SUCCESS } from "../actionType";

const initialState = {
  dashboard: null,
  error: null,
};

export const dashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case DASHBOARD_SUCCESS:
      return {
        ...state,
        dashboard: action.payload,
        error: null,
      };

    case DASHBOARD_FAIL:
      return {
        ...state,
        dashboard: null,
        error: action.payload,
      };

    default:
      return state;
  }
};

import { USER_C_FAIL, USER_C_SUCCESS } from "../actionType";

const initialState = {
  userClient: [],
  error: null,
};

export const userClientReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_C_SUCCESS:
      return {
        ...state,
        userClient: action.payload,
        error: null,
      };

    case USER_C_FAIL:
      return {
        ...state,
        userClient: [],
        error: action.payload,
      };

    default:
      return state;
  }
};

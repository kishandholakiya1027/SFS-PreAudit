import { REGISTER_FAIL, REGISTER_SUCCESS } from "../actionType";

const initialState = {
  user: [],
  error: null,
};

export const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        error: null,
      };

    case REGISTER_FAIL:
      return {
        ...state,
        user: [],
        error: action.payload,
      };

    default:
      return state;
  }
};

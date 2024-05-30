import { QUERY_FAIL, QUERY_SUCCESS } from "../actionType";

const initialState = {
  query: null,
  error: null,
};

export const queryReducer = (state = initialState, action) => {
  switch (action.type) {
    case QUERY_SUCCESS:
      return {
        ...state,
        query: action.payload,
        error: null,
      };

    case QUERY_FAIL:
      return {
        ...state,
        query: null,
        error: action.payload,
      };

    default:
      return state;
  }
};

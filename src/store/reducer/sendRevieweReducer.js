import { SEND_REVIEWE_SUCCESS, SEND_REVIEWE_FAIL } from "../actionType";

const initialState = {
  reviewer: [],
  error: null,
};

export const sendRevieweReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEND_REVIEWE_SUCCESS:
      return {
        ...state,
        reviewer: action.payload,
        error: null,
      };

    case SEND_REVIEWE_FAIL:
      return {
        ...state,
        reviewer: [],
        error: action.payload,
      };

    default:
      return state;
  }
};

import { MEMBER_FAIL, MEMBER_SUCCESS } from "../../actionType";

const initialState = {
  member: [],
  error: null,
};

export const memberReducer = (state = initialState, action) => {
  switch (action.type) {
    case MEMBER_SUCCESS:
      return {
        ...state,
        member: action.payload,
        error: null,
      };

    case MEMBER_FAIL:
      return {
        ...state,
        member: [],
        error: action.payload,
      };

    default:
      return state;
  }
};

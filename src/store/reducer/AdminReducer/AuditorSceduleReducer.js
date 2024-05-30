import { AUDIT_FAIL, AUDIT_SUCCESS } from "../../actionType";

const initialState = {
  audit: [],
  error: null,
};

export const AuditorSceduleReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUDIT_SUCCESS:
      return {
        ...state,
        audit: action.payload,
        error: null,
      };

    case AUDIT_FAIL:
      return {
        ...state,
        audit: [],
        error: action.payload,
      };

    default:
      return state;
  }
};

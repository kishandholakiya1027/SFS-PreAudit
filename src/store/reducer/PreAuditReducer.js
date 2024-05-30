import { ONE_AUDIT_SUCCESS, ONE_AUDIT_FAIL } from "../actionType";

const initialState = {
  preaudit: null,
  error: null,
};

export const preAuditReducer = (state = initialState, action) => {
  switch (action.type) {
    case ONE_AUDIT_SUCCESS:
      return {
        ...state,
        preaudit: action.payload,
        error: null,
      };

    case ONE_AUDIT_FAIL:
      return {
        ...state,
        preaudit: null,
        error: action.payload,
      };

    default:
      return state;
  }
};

import { MEMBERROLE_FAIL, MEMBERROLE_SUCCESS } from "../../actionType";

const initialState = {
  member_role: [],
  error: null,
};

export const memberRoleReducer = (state = initialState, action) => {
  switch (action.type) {
    case MEMBERROLE_SUCCESS:
      return {
        ...state,
        member_role: action.payload,
        error: null,
      };

    case MEMBERROLE_FAIL:
      return {
        ...state,
        member_role: [],
        error: action.payload,
      };

    default:
      return state;
  }
};

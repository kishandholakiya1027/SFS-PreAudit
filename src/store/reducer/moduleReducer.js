import { MODULE_P_SUCCESS, MODULE_P__FAIL } from "../actionType";

const initialState = {
  modules: [],
  error: null,
};

export const moduleReducer = (state = initialState, action) => {
  switch (action.type) {
    case MODULE_P_SUCCESS:
      return {
        ...state,
        modules: action.payload,
        error: null,
      };

    case MODULE_P__FAIL:
      return {
        ...state,
        modules: [],
        error: action.payload,
      };

    default:
      return state;
  }
};

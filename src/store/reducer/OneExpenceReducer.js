import { ONE_EXPENSE_FAIL, ONE_EXPENSE_SUCCESS } from "../actionType";

const initialState = {
  oneExpanse: {},
  error: null,
};

export const OneExpenceReducer = (state = initialState, action) => {
  switch (action.type) {
    case ONE_EXPENSE_SUCCESS:
      return {
        ...state,
        oneExpanse: action.payload,
        error: null,
      };

    case ONE_EXPENSE_FAIL:
      return {
        ...state,
        oneExpanse: {},
        error: action.payload,
      };

    default:
      return state;
  }
};

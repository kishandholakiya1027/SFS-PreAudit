import { EXPENSE_SUCCESS, EXPENSE_FAIL } from "../../actionType";

const initialState = {
  data: [],
  error: null,
};

export const ExpenceReducer = (state = initialState, action) => {
  switch (action.type) {
    case EXPENSE_SUCCESS:
      return {
        ...state,
        data: action.payload,
        error: null,
      };

    case EXPENSE_FAIL:
      return {
        ...state,
        data: [],
        error: action.payload,
      };

    default:
      return state;
  }
};

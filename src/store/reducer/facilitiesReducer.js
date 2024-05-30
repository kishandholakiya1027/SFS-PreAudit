import { FACILITIES_FAIL, FACILITIES_SUCCESS } from "../actionType";

const initialState = {
  facilities: [],
  error: null,
};

export const facilitiesReducer = (state = initialState, action) => {
  switch (action.type) {
    case FACILITIES_SUCCESS:
      return {
        ...state,
        facilities: action.payload,
        error: null,
      };

    case FACILITIES_FAIL:
      return {
        ...state,
        facilities: [],
        error: action.payload,
      };

    default:
      return state;
  }
};

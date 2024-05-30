import { COUNTRY_FAIL, COUNTRY_SUCCESS } from "../actionType";

const initialState = {
  country: [],
  error: null,
};

export const countryReducer = (state = initialState, action) => {
  switch (action.type) {
    case COUNTRY_SUCCESS:
      return {
        ...state,
        currency: [],
        roles: [],
        country: action.payload,
        error: null,
      };

    case COUNTRY_FAIL:
      return {
        ...state,
        currency: [],
        roles: [],
        country: [],
        error: action.payload,
      };

    default:
      return state;
  }
};

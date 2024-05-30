import {
  MANAGE_FAIL,
  MANAGE_SUCCESS,
  CLIENT_SUCCESS,
  CLIENT_FAIL,
  PAYER_SUCCESS,
  PAYER_FAIL,
} from "../actionType";

const initialState = {
  data: null,
  clientInfo: {},
  payer: null,
  error: null,
};

export const manageUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case MANAGE_SUCCESS:
      return {
        ...state,
        data: action.payload,
        error: null,
      };

    case MANAGE_FAIL:
      return {
        ...state,
        data: null,
        error: action.payload,
      };

    case CLIENT_SUCCESS:
      return {
        ...state,
        clientInfo: action.payload,
        error: null,
      };

    case CLIENT_FAIL:
      return {
        ...state,
        clientInfo: {},
        error: action.payload,
      };

    case PAYER_SUCCESS:
      return {
        ...state,
        payer: action.payload,
        error: null,
      };

    case PAYER_FAIL:
      return {
        ...state,
        payer: null,
        error: action.payload,
      };

    default:
      return state;
  }
};

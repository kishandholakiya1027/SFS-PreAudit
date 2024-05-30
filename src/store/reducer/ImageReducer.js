import { IMAGE_FAIL, IMAGE_SUCCESS } from "../actionType";

const initialState = {
  image: "",
  error: null,
};

export const imageReducer = (state = initialState, action) => {
  switch (action.type) {
    case IMAGE_SUCCESS:
      return {
        ...state,
        image: action.payload,
        error: null,
      };

    case IMAGE_FAIL:
      return {
        ...state,
        image: "",
        error: action.payload,
      };

    default:
      return state;
  }
};

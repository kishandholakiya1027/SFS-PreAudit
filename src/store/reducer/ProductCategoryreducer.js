import {
  PRODUCT_CATEGORY_SUCCESS,
  PRODUCT_CATEGORY__FAIL,
  PRODUCT_ALL_CATEGORY_SUCCESS,
  PRODUCT_ALL_CATEGORY__FAIL,
  CHILD_ALL_CATEGORY_SUCCESS,
  CHILD_ALL_CATEGORY__FAIL,
} from "../actionType";

const initialState = {
  productCategory: [],
  category: [],
  childCategory: [],
  error: null,
};

export const ProductCategoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case PRODUCT_CATEGORY_SUCCESS:
      return {
        ...state,
        productCategory: action.payload,
        error: null,
      };

    case PRODUCT_CATEGORY__FAIL:
      return {
        ...state,
        productCategory: [],
        error: action.payload,
      };
    case PRODUCT_ALL_CATEGORY_SUCCESS:
      return {
        ...state,
        category: action.payload,
        error: null,
      };

    case PRODUCT_ALL_CATEGORY__FAIL:
      return {
        ...state,
        category: [],
        error: action.payload,
      };
    case CHILD_ALL_CATEGORY_SUCCESS:
      return {
        ...state,
        childCategory: action.payload,
        error: null,
      };

    case CHILD_ALL_CATEGORY__FAIL:
      return {
        ...state,
        childCategory: [],
        error: action.payload,
      };

    default:
      return state;
  }
};

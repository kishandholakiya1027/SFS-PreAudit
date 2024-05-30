import toast from "react-hot-toast";
import { api } from "../../axios/api";
import {
  PRODUCT_CATEGORY_SUCCESS,
  PRODUCT_CATEGORY__FAIL,
  PRODUCT_ALL_CATEGORY__FAIL,
  PRODUCT_ALL_CATEGORY_SUCCESS,
  CHILD_ALL_CATEGORY_SUCCESS,
  CHILD_ALL_CATEGORY__FAIL,
} from "../actionType";
import { updateCurrentStep } from "./CurrentStep";

export const GetCategory = () => {
  return async (dispatch) => {
    try {
      const ModuleData = await api(`/category/all`, "get");
      if (ModuleData.status === 200) {
        dispatch({
          type: PRODUCT_CATEGORY_SUCCESS,
          payload: ModuleData.data.data,
        });
      }
    } catch (error) {
      dispatch({
        type: PRODUCT_CATEGORY__FAIL,
        payload: error.response.data.message,
      });
    }
  };
};

export const ProductCategoryaction = (data, Navigate) => {
  return async (dispatch) => {
    try {
      const ModuleData = await api(`/addcategory`, "post", data);
      if (ModuleData.status === 200) {
        toast.success("Successfully Added.");
        dispatch(GetCategory());
        const payload = {
          userid: data.userid,
          step: 6,
        };
        dispatch(updateCurrentStep(payload));
        Navigate(`/facilities/${data.userid}`);
      }
    } catch (error) {
      toast.error("Something Wrong");
      dispatch({
        type: PRODUCT_CATEGORY__FAIL,
        payload: error.response.data.message,
      });
    }
  };
};

export const GetAllCategory = () => {
  return async (dispatch) => {
    try {
      const ModuleData = await api(`/getallcategory`, "get");
      if (ModuleData.status === 200) {
        dispatch({
          type: PRODUCT_ALL_CATEGORY_SUCCESS,
          payload: ModuleData.data.data,
        });
      }
    } catch (error) {
      dispatch({
        type: PRODUCT_ALL_CATEGORY__FAIL,
        payload: error.response.data.message,
      });
    }
  };
};

export const DeleteCategory = async (id) => {
  return await api(`/deletecategory/${id}`, "delete");
};

export const ProductNewCategoryaction = (data, Navigate) => {
  return async (dispatch) => {
    try {
      const ModuleData = await api(`/addnewcategory`, "post", data);
      if (ModuleData.status === 200) {
        dispatch(GetAllCategory());
        toast.success("Successfully Added.");
      }
    } catch (error) {
      toast.error("Something Wrong");
      dispatch({
        type: PRODUCT_ALL_CATEGORY__FAIL,
        payload: error.response.data.message,
      });
    }
  };
};

export const UpdateProductNewCategory = (data, Navigate) => {
  return async (dispatch) => {
    try {
      const ModuleData = await api(`/updatenewcategory`, "patch", data);
      if (ModuleData.status === 200) {
        dispatch(GetAllCategory());
        toast.success(ModuleData.data.message);
      }
    } catch (error) {
      toast.error("Something Wrong");
      dispatch({
        type: PRODUCT_ALL_CATEGORY__FAIL,
        payload: error.response.data.message,
      });
    }
  };
};

export const GetChildCategoryaction = (id) => {
  return async (dispatch) => {
    try {
      const ModuleData = await api(`/getchildcategory/${id}`, "get");
      if (ModuleData.status === 200) {
        dispatch({
          type: CHILD_ALL_CATEGORY_SUCCESS,
          payload: ModuleData.data.data,
        });
      }
    } catch (error) {
      toast.error("Something Wrong");
      dispatch({
        type: CHILD_ALL_CATEGORY__FAIL,
        payload: error.response.data.message,
      });
    }
  };
};

export const UpdateChildCategory = (data, id) => {
  return async (dispatch) => {
    try {
      const ModuleData = await api(`/updatechildcategory`, "patch", data);
      if (ModuleData.status === 200) {
        dispatch(GetChildCategoryaction(id));
        toast.success(ModuleData.data.message);
      }
    } catch (error) {
      toast.error("Something Wrong");
      dispatch({
        type: PRODUCT_ALL_CATEGORY__FAIL,
        payload: error.response.data.message,
      });
    }
  };
};

export const GetChildCategoryById = (id) => {
  return api(`/getchildcategorybyid`, "post", id);
};

export const DeleteChildCategory = (id) => {
  return api(`/deletechildcategory/${id}`, "delete");
};

export const ChildCategoryaction = (data) => {
  return async (dispatch) => {
    try {
      const ModuleData = await api(`/addchildcategory`, "post", data);
      if (ModuleData.status === 200) {
        toast.success("Successfully Added.");
        dispatch(GetChildCategoryaction(data.parentid));
      }
    } catch (error) {
      toast.error("Something Wrong");
      dispatch({
        type: CHILD_ALL_CATEGORY__FAIL,
        payload: error.response.data.message,
      });
    }
  };
};

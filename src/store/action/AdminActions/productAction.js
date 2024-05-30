import { toast } from "react-hot-toast";
import { api } from "../../../axios/api";
import {
  ADD_PRODUCT_FAIL,
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_TYPE_FAIL,
  ADD_PRODUCT_TYPE_SUCCESS,
  PRODUCT_FAIL,
  PRODUCT_SUCCESS,
} from "../../actionType";

export const GetProduct = () => {
  return async (dispatch) => {
    try {
      const MemberData = await api(`/getallproduct`, "get");
      if (MemberData.status === 200) {
        dispatch({ type: PRODUCT_SUCCESS, payload: MemberData.data.data });
      }
    } catch (error) {
      toast.error(error.response.data.message);
      dispatch({ type: PRODUCT_FAIL, payload: error.response.data.message });
    }
  };
};

export const GetProductById = (id) => {
  return api(`/getproduct/${id}`, "get");
};

export const GetProductCate = () => {
  return api(`/getproductcate`, "get");
};

export const AddProductCate = (payload) => {
  return api(`/addproductcate`, "post", payload);
};

export const DeleteProductCate = (id) => {
  return api(`/deleteproduc1tcate/${id}`, "delete");
};

export const GetProductDetail = () => {
  return api(`/getproductdetail`, "get");
};

export const GetRowMaterial = () => {
  return api(`/getrowmaterial`, "get");
};

export const AddProduct = (user, getData) => {
  return async (dispatch) => {
    try {
      const MemberData = await api(`/addproduct`, "post", user);
      if (MemberData.status === 200) {
        toast.success(
          !!MemberData.data.message
            ? MemberData.data.message
            : "Product Added Successfully."
        );
        dispatch(GetProduct());
        getData();
      }
    } catch (error) {
      toast.error(error.response.data.message);
      dispatch({ type: PRODUCT_FAIL, payload: error.response.data.message });
    }
  };
};
export const AddManyProduct = (data) => {
  return async (dispatch) => {
    try {
      const Products = await api(`/addmanyproduct`, "post", data);
      if (Products.status === 200) {
        toast.success(
          !!Products.data.message
            ? Products.data.message
            : "Product Added Successfully."
        );
        dispatch(GetProduct());
      }
    } catch (error) {
      toast.error(error?.message);
      dispatch({ type: PRODUCT_FAIL, payload: error?.message });
    }
  };
};

export const GetProducts = () => {
  return async (dispatch) => {
    try {
      const MemberData = await api(`/getproducts`, "get");
      if (MemberData.status === 200) {
        dispatch({ type: ADD_PRODUCT_SUCCESS, payload: MemberData.data.data });
      }
    } catch (error) {
      console.log("Error:", error);
      dispatch({ type: PRODUCT_FAIL, payload: error?.message });
    }
  };
};

export const GetProductsType = () => {
  return async (dispatch) => {
    try {
      const MemberData = await api(`/getproducttype`, "get");
      if (MemberData.status === 200) {
        dispatch({
          type: ADD_PRODUCT_TYPE_SUCCESS,
          payload: MemberData.data.data,
        });
      }
    } catch (error) {
      toast.error(error.response.data.message);
      dispatch({
        type: ADD_PRODUCT_TYPE_FAIL,
        payload: error.response.data.message,
      });
    }
  };
};

export const AddProductType = (user) => {
  return async (dispatch) => {
    try {
      const MemberData = await api(`/addproducttype`, "post", user);
      if (MemberData.status === 200) {
        toast.success(
          !!MemberData.data.message
            ? MemberData.data.message
            : "Product Added Successfully."
        );
        dispatch(GetProductsType());
      }
    } catch (error) {
      toast.error(error.response.data.message);
      dispatch({
        type: ADD_PRODUCT_TYPE_FAIL,
        payload: error.response.data.message,
      });
    }
  };
};

export const AddProducts = (user) => {
  return async (dispatch) => {
    try {
      const MemberData = await api(`/addproducts`, "post", user);
      if (MemberData.status === 200) {
        toast.success("Product Added Successfully.");
        dispatch(GetProducts());
      }
    } catch (error) {
      toast.error(error.response.data.message);
      dispatch({
        type: ADD_PRODUCT_FAIL,
        payload: error.response.data.message,
      });
    }
  };
};

export const UpdateProducts = (user, id) => {
  return async (dispatch) => {
    try {
      const MemberData = await api(`/updateproducts/${id}`, "patch", user);
      if (MemberData.status === 200) {
        toast.success(MemberData.data.message);
        dispatch(GetProducts());
      }
    } catch (error) {
      toast.error(error.response.data.message);
      dispatch({
        type: ADD_PRODUCT_FAIL,
        payload: error.response.data.message,
      });
    }
  };
};

export const DeleteProducts = (id) => {
  return async (dispatch) => {
    try {
      const MemberData = await api(`/deleteproducts/${id}`, "delete");
      if (MemberData.status === 200) {
        toast.success(MemberData.data.message);
        dispatch(GetProducts());
      }
    } catch (error) {
      toast.error(error.response.data.message);
      dispatch({
        type: ADD_PRODUCT_FAIL,
        payload: error.response.data.message,
      });
    }
  };
};

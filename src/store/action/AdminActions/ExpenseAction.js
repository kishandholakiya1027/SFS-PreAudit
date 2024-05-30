import { toast } from "react-hot-toast";
import { api } from "../../../axios/api";
import {
  EXPENSE_SUCCESS,
  EXPENSE_FAIL,
  ONE_EXPENSE_FAIL,
  ONE_EXPENSE_SUCCESS,
} from "../../actionType";

export const getOneExpense = (id, setLoading) => {
  return async (dispatch) => {
    try {
      const ExpenseData = await api(`/expanse/one/${id}`, "get");
      if (ExpenseData.status === 200) {
        setLoading(false);
        dispatch({ type: ONE_EXPENSE_SUCCESS, payload: ExpenseData.data.data });
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: ONE_EXPENSE_FAIL,
        payload: error?.response?.data?.message,
      });
    }
  };
};

export const GetAllExpense = (filter, setLoading) => {
  return async (dispatch) => {
    try {
      const query = filter ? `/expanse/all?${filter}` : `/expanse/all`;
      const ExpenseData = await api(query, "get");
      if (ExpenseData.status === 200) {
        setLoading(false);
        dispatch({ type: EXPENSE_SUCCESS, payload: ExpenseData.data.data });
      }
    } catch (error) {
      setLoading(false);
      dispatch({ type: EXPENSE_FAIL, payload: error?.response?.data?.message });
    }
  };
};

export const UpdateExpense = (id, data, setLoading3) => {
  return async (dispatch) => {
    try {
      const ExpenseData = await api(`/expanse/update/${id}`, "post", data);
      if (ExpenseData.status === 200) {
        setLoading3(false);
        toast.success("Invoice updated successfully");
      }
    } catch (error) {
      setLoading3(false);
      dispatch({ type: EXPENSE_FAIL, payload: error?.response?.data?.message });
    }
  };
};

export const PostExpense = (user) => {
  return async (dispatch) => {
    try {
      const ExpenseData = await api(`/addExpense`, "post", user);
      if (ExpenseData.status === 200) {
        toast.success("Added Successfully Save");
      }
    } catch (error) {
      toast.error(error?.response?.message);
      dispatch({ type: EXPENSE_FAIL, payload: error?.response?.data?.message });
    }
  };
};

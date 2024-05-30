import toast from "react-hot-toast";
import { api } from "../../axios/api";
import {
  INVOICE_QUESTION_FAIL,
  INVOICE_QUESTION_SUCCESS,
  SEND_INVOICE_SUCCESS,
  SEND_INVOICE__FAIL,
} from "../actionType";

export const SendInvoice = (data, setIsLoading) => {
  return async (dispatch) => {
    setIsLoading(true);
    try {
      const ModuleData = await api(`/sendinvoice`, "post", data);
      if (ModuleData.status === 200) {
        toast.success(ModuleData.data.message);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      toast.error(error.response.data.message);
    }
  };
};

export const GetInvoice = () => {
  return async (dispatch) => {
    try {
      const invoiceData = await api(`/getinvoice`, "get");

      if (invoiceData.status === 200) {
        dispatch({
          type: SEND_INVOICE_SUCCESS,
          payload: invoiceData.data.data,
        });
      }
    } catch (error) {
      dispatch({
        type: SEND_INVOICE__FAIL,
        payload: error.response.data.message,
      });
    }
  };
};

export const deleteInvoice = (id) => {
  return async (dispatch) => {
    try {
      const invoiceRes = await api(`/deleteinvoice/${id}`, "delete");
      if (invoiceRes.status === 200) {
        dispatch(GetInvoice());
        toast.success(invoiceRes.data.message);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };
};

export const getInvoiceById = (id, setInvoice) => {
  return async (dispatch) => {
    try {
      const invoiceRes = await api(`/getinvoice/${id}`, "get");
      if (invoiceRes?.status === 200) {
        setInvoice(invoiceRes?.data?.data);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };
};

export const GetQuatation = () => {
  return async (dispatch) => {
    try {
      const ModuleData = await api(`/getquotation`, "get");
      if (ModuleData.status === 200) {
        dispatch({
          type: INVOICE_QUESTION_SUCCESS,
          payload: ModuleData.data.data,
        });
      }
    } catch (error) {
      dispatch({
        type: INVOICE_QUESTION_FAIL,
        payload: error.response.data.message,
      });
    }
  };
};

export const AddQuatation = (data) => {
  return async (dispatch) => {
    try {
      const ModuleData = await api(`/uploadquotation`, "post", data);
      if (ModuleData.status === 200) {
        toast.success("Successfully Uploaded.");
        dispatch(GetQuatation());
      }
    } catch (error) {
      toast.error("Something Wrong");
      dispatch({
        type: INVOICE_QUESTION_FAIL,
        payload: error.response.data.message,
      });
    }
  };
};

export const AddInvoiceQuestion = (data, id) => {
  return async (dispatch) => {
    try {
      const InvoiceData = await api(`/addinvoicequestion`, "post", data);
      if (InvoiceData.status === 200) {
        toast.success("Successfully Uploaded.");
        dispatch(GetInvoiceQuestion(id));
      }
    } catch (error) {
      toast.error("Something Wrong");
      dispatch({
        type: INVOICE_QUESTION_FAIL,
        payload: error.response.data.message,
      });
    }
  };
};

export const GetInvoiceQuestion = (id) => {
  return async (dispatch) => {
    try {
      const InvoiceData = await api(`/getallinvoicequestion/${id}`, "get");
      if (InvoiceData.status === 200) {
        dispatch({
          type: INVOICE_QUESTION_SUCCESS,
          payload: InvoiceData.data.data,
        });
      }
    } catch (error) {
      dispatch({
        type: INVOICE_QUESTION_FAIL,
        payload: error.response.data.message,
      });
    }
  };
};

export const GetSingleInvoiceQuestion = (id, type) => {
  return async (dispatch) => {
    try {
      const InvoiceData = await api(
        `/getsingleinvoicequestion?id=${id}&type=${type}`,
        "get"
      );
      if (InvoiceData.status === 200) {
        dispatch({
          type: INVOICE_QUESTION_SUCCESS,
          payload: InvoiceData.data.data,
        });
      }
    } catch (error) {
      dispatch({
        type: INVOICE_QUESTION_FAIL,
        payload: error.response.data.message,
      });
    }
  };
};

export const deleteInvoiceQuestion = (id) => {
  return async (dispatch) => {
    try {
      const invoiceRes = await api(`/deleteinvoicequestion`, "delete");
      if (invoiceRes.status === 200) {
        dispatch(GetInvoiceQuestion(id));
        toast.success(invoiceRes.data.message);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };
};

export const updateInvoiceQuestion = (id) => {
  return async (dispatch) => {
    try {
      const invoiceRes = await api(`/updateinvoicequestion`, "post");
      if (invoiceRes.status === 200) {
        dispatch(GetInvoiceQuestion(id));
        toast.success(invoiceRes.data.message);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };
};

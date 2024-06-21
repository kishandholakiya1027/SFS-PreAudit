import { api } from "../../axios/api";
import { IMAGE_FAIL, IMAGE_SUCCESS } from "../actionType";

export const uploadImage = (data, link, i, setDoc) => {
  return async (dispatch) => {
    try {
      const CurrencyData = await api(`/upload_doc`, "post", data);
      if (CurrencyData.status === 200) {
        setDoc((prev) => {
          return prev.map((item) => {
            if (item.name === link) {
              return {
                ...item,
                documents: item.documents.map((doc) => {
                  if (doc.id === i + 1) {
                    return { ...doc, document: CurrencyData.data.docUrl };
                  } else {
                    return doc;
                  }
                }),
              };
            }
            return item;
          });
        });
        dispatch({ type: IMAGE_SUCCESS, payload: CurrencyData.data.data });
      }
    } catch (error) {
      dispatch({ type: IMAGE_FAIL, payload: error.response.data.message });
    }
  };
};

export const uploadImage6 = (formData, index, setPreAudit, unit) => {
  return async (dispatch) => {
    try {
      const res = await api(`/upload_doc`, "post", formData);
      if (res.status === 200) {
        setPreAudit((prev) => {
          return prev.map((item, idx) => {
            if (idx === +unit - 1) {
              const updatedStandards = [...item.standards];
              updatedStandards[index] = {
                ...updatedStandards[index],
                document: res.data.docUrl,
              };
              return {
                ...item,
                standards: updatedStandards,
              };
            }
            return item;
          });
        });
        dispatch({ type: IMAGE_SUCCESS, payload: res.data.data });
      }
    } catch (error) {
      dispatch({ type: IMAGE_FAIL, payload: error?.message });
    }
  };
};

export const uploadImage8 = (formData, setPreAudit, unit) => {
  return async (dispatch) => {
    try {
      const res = await api(`/upload_doc`, "post", formData);
      if (res.status === 200) {
        setPreAudit((prev) => {
          return prev.map((item, idx) => {
            if (idx === +unit - 1) {
              return {
                ...item,
                afl: res.data.docUrl,
              };
            }
            return item;
          });
        });
        dispatch({ type: IMAGE_SUCCESS, payload: res.data.data });
      }
    } catch (error) {
      dispatch({ type: IMAGE_FAIL, payload: error?.message });
    }
  };
};

export const uploadImage7 = (formData, i, setDoc, unit) => {
  return async (dispatch) => {
    try {
      const res = await api(`/upload_doc`, "post", formData);
      if (res.status === 200) {
        setDoc((prev) => {
          return prev.map((item) => {
            if (item.id === +unit) {
              return {
                ...item,
                documents: item.documents.map((doc) => {
                  if (doc.id === i + 1) {
                    return { ...doc, document: res.data.docUrl };
                  } else {
                    return doc;
                  }
                }),
              };
            }
            return item;
          });
        });
        dispatch({ type: IMAGE_SUCCESS, payload: res.data.data });
      }
    } catch (error) {
      dispatch({ type: IMAGE_FAIL, payload: error?.message });
    }
  };
};

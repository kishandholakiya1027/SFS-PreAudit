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

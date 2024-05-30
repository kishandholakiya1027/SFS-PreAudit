import { SEND_INVOICE__FAIL, SEND_INVOICE_SUCCESS } from "../actionType"


const initialState = {
    invoice: [],
    error: null
}

export const SendInvoiceReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEND_INVOICE_SUCCESS:
            return {
                ...state,
                invoice: action.payload,
                error: null
            }

        case SEND_INVOICE__FAIL:
            return {
                ...state,
                invoice: [],
                error: action.payload
            }

        default:
            return state
    }
}
import { GET_STEP_SUCCESS } from "../actionType"

const initialState = {
    currentStep: 0
}

const currentStepDataReducer = (state = initialState, action) => {

    switch (action.type) {
        case GET_STEP_SUCCESS:
            return {
                ...state,
                currentStep: action.payload
            }
        default:
            return state
    }
}

export default currentStepDataReducer
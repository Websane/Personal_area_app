import {
    CONTACT_DISCHARGE,
    CONTACT_REQUEST,
    CONTACT_REQUEST_ERROR,
    CONTACT_REQUEST_SUCCESS
} from "../actions/contactActions";

const initialState = {
    status: 'init', //'success' 'loading' 'error'
    value: '',
    errorMessage: '',
    loading: false,
};

const contactReducer = (state = initialState, action) => {
    switch (action.type) {
        case CONTACT_REQUEST:
            return {
                ...state,
                status: 'loading',
                loading: true,
            }
        case CONTACT_REQUEST_SUCCESS:
            return {
                ...state,
                status: 'success',
                value: action.contact,
                loading: false
            }
        case CONTACT_REQUEST_ERROR:
            return {
                ...state,
                status: 'error',
                errorMessage: action.error,
                loading: false,
            }
        case CONTACT_DISCHARGE:
            return {
                ...state,
                status: 'init'
            }
        default: return state
    }
}

export default contactReducer;
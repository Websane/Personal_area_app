import {
    TOKEN_DELETE,
    TOKEN_REQUEST,
    TOKEN_REQUEST_ERROR,
    TOKEN_REQUEST_SUCCESS
} from "../actions/tokenActions";

const initialState = {
    status: 'init', //'success' 'loading' 'error'
    value: '',
    errorMessage: '',
    loading: false,
};

const tokenReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOKEN_REQUEST:
            return {
                ...state,
                status: 'loading',
                loading: true,
            }
        case TOKEN_REQUEST_SUCCESS:
            return {
                ...state,
                status: 'success',
                value: action.token,
                loading: false,
            }
        case TOKEN_REQUEST_ERROR:
            return {
                ...state,
                status: 'error',
                errorMessage: action.error,
                loading: false,
            }
        case TOKEN_DELETE:
            return {
                ...state,
                status: 'init',
                value: action.token,
            }
        default: return state
    }
}

export default tokenReducer;
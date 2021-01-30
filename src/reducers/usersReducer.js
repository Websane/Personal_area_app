import {
    USERS_REMOVE,
    USERS_REQUEST,
    USERS_REQUEST_ERROR,
    USERS_REQUEST_SUCCESS,
} from "../actions/listUsersActions";

const initialState = {
    status: 'init', //'success' 'loading' 'error'
    list: [],
    errorMessage: '',
    loading: false,
};

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case USERS_REQUEST:
            return {
                ...state,
                status: 'loading',
                loading: true,
            };
        case USERS_REQUEST_SUCCESS:
            return {
                ...state,
                status: 'success',
                list: action.users,
                loading: false,
            }
        case USERS_REQUEST_ERROR:
            return {
                ...state,
                status: 'error',
                errorMessage: action.error,
                loading: false,
            }
        case USERS_REMOVE:
            return {
                ...state,
                status: 'init',
                list: action.users,
                loading: false,
            }
        default: return state
    }
}

export default usersReducer;
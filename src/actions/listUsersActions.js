export const USERS_REQUEST = 'USERS_REQUEST';
export const USERS_REQUEST_SUCCESS = 'USERS_REQUEST_SUCCESS';
export const USERS_REQUEST_ERROR = 'USERS_REQUEST_ERROR';
export const USERS_REMOVE = 'USERS_REMOVE';

export const usersRequest = () => ({
    type: USERS_REQUEST,
})
export const usersRequestSuccess = (users) => ({
    type: USERS_REQUEST_SUCCESS,
    users,
})
export const usersRequestError = (error) => ({
    type: USERS_REQUEST_ERROR,
    error,
})
export const usersRemove = (users) => ({
    type: USERS_REMOVE,
    users
})

const requestURL = 'http://localhost:3001/users';
const headers = (token) => {
    return {
        'Authorization': `Bearer ${token}`
    }
}

//запрос списка юзеров
export const getUsers = (data) => async (dispatch) => {
    const token = localStorage.getItem('token');
    dispatch(usersRequest());
    try {
        let response = await fetch(requestURL, {
            method: 'GET',
            headers: headers(token),
        });
        let result = await response.json();
        if (response.ok) {
            dispatch(usersRequestSuccess(result));
        } else {
            dispatch(usersRequestError(`${result.message}`));
        }
    } catch (error) {
        dispatch(usersRequestError(`${error}`));
    }
}

export const  removeUsers = (users) => (dispatch) => {
    dispatch(usersRemove(users));
}
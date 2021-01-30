export const TOKEN_REQUEST = 'TOKEN_REQUEST';
export const TOKEN_REQUEST_SUCCESS = 'TOKEN_REQUEST_SUCCESS';
export const TOKEN_REQUEST_ERROR = 'TOKEN_REQUEST_ERROR';
export const TOKEN_DELETE = 'TOKEN_DELETE';

//события для получения токена
export const tokenRequest = () => ({
    type: TOKEN_REQUEST,
})
export const tokenRequestSuccess = (token) => ({
    type: TOKEN_REQUEST_SUCCESS,
    token,
})
export const tokenRequestError = (error) => ({
    type: TOKEN_REQUEST_ERROR,
    error,
})
//события отмены токена
export const tokenRemove = (token) => ({
    type: TOKEN_DELETE,
    token,
})

const requestURL = 'http://localhost:3001/auth/login';
const headers = {
    'Content-Type': 'application/json'
}
//запрос токена для авторизации
export const getToken = (data) => async (dispatch) => {
    dispatch(tokenRequest());
    try {
        let response = await fetch(requestURL, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: headers
        });
        let result = await response.json();
        if (response.ok) {
            localStorage.setItem('token', result.access_token);
            dispatch(tokenRequestSuccess(result.access_token));
        } else {
            dispatch(tokenRequestError(`Введены неверные данные: ${result.message}`));
        }
    } catch (error) {
        dispatch(tokenRequestError(`Ошибка получения токена: ${error}`));
    }
}
//для изменения статуса токена
export const tokenDelete = () => (dispatch) => {
    localStorage.removeItem('token');
    // localStorage.clear();
    dispatch(tokenRemove(''));
}

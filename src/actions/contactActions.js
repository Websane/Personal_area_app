export const CONTACT_REQUEST = 'CONTACT_REQUEST';
export const CONTACT_REQUEST_SUCCESS = 'CONTACT_REQUEST_SUCCESS';
export const CONTACT_REQUEST_ERROR = 'CONTACT_REQUEST_ERROR';
export const CONTACT_DISCHARGE = 'CONTACT_DISCHARGE';

export const contactRequest = () => ({
    type: CONTACT_REQUEST,
})
export const contactRequestSuccess = (contact) => ({
    type: CONTACT_REQUEST_SUCCESS,
    contact,
})
export const contactRequestError = (error) => ({
    type: CONTACT_REQUEST_ERROR,
    error,
})

export  const contactDischarge = () => ({
    type:CONTACT_DISCHARGE,
})

const headers = (token) => {
    return {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    }
}

export const doActionContact = (data, method) => async (dispatch) => {
    let url = 'http://localhost:3001/users';

    const options = {
        method: method,
        body: JSON.stringify(data[0]),
        headers: headers(data[1]),
    }

    if (method === 'DELETE') {
        const id = data.id;
        url = url + `/${id}/`;

        delete options.body;
        options.headers = headers(data.token);

    } else if (method === 'PUT') {
        const id = data[2];
        url = url + `/${id}/`;
    }

    dispatch(contactRequest());
    try {
        let response = await fetch(url, options);
        let result = await response.json();
        if (response.ok) {
            dispatch(contactRequestSuccess(result));
        } else {
            dispatch(contactRequestError(`${result.message}`));
        }
    } catch (error) {
        dispatch(contactRequestError(`${error}`));
    }
}
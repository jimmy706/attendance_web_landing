export function getErrorMessage(error) {
    if (typeof error === 'string') {
        return error;
    }
    if (error.response) {
        if (error.response.data && typeof error.response.data === 'object') {
            for (let key in error.response.data) {
                return error.response.data[key];
            }
        }
    }
    if (error.message && typeof error.message === 'string') {
        return error.message
    }


    return "Unknow error!";
}

export function withAuthorization(token) {
    return {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }
}
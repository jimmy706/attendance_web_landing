import { getMyProfileAPI } from '../../APIs/auth';

export const UserActionTypes = {
    LOGIN: "LOGIN",
    LOGOUT: "LOGOUT"
}

export function loginAction(userProfile) {
    return {
        type: UserActionTypes.LOGIN,
        payload: userProfile
    }
}

export function loginAndFetchProfile(token) {
    return async dispatch => {
        try {
            const result = await getMyProfileAPI(token);
            dispatch(loginAction(result.data));
        }
        catch (err) {
            console.log(err.response);
        }
    }
}


import { UserActionTypes } from "../actions/user.action";

const initialState = {
    profile: null,
    isLogin: false
}

function userReducer(state = initialState, action) {
    switch (action.type) {

        case UserActionTypes.LOGIN:
            return {
                ...state,
                profile: action.payload,
                isLogin: true
            }
        case UserActionTypes.LOGOUT:
            return {
                ...state,
                profile: null,
                isLogin: false
            }
        default:
            return { ...state };
    }
}

export default userReducer;
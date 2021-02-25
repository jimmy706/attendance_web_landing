const initialState = {
    profile: null,
    isLogin: false
}

function userReducer(state = initialState, action) {
    switch (action.type) {
        default:
            return { ...state };
    }
}

export default userReducer;
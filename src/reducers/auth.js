const initialState = {
    isLoggingIn: false,
    user: {}, 
    error: ''
}

const auth = (state = initialState, action) => {
    switch (action.type) {
        case 'REQUEST_LOGIN':
            return Object.assign(
                {},
                state,
                { isLoggingIn: true, error: '' }
            )
        case 'FINISH_LOGIN':
            return Object.assign(
                {},
                state,
                { isLoggingIn: false, user: action.user }
            )
        case 'FAILED_LOGIN':
            return Object.assign(
                {},
                state,
                { isLoggingIn: false, error: action.error }
            )
        case 'CLEAR_USER':
            return Object.assign(
                {},
                state,
                { user: {} }
            )
        case 'CLEAR_AUTH_ERROR':
            return Object.assign(
                {},
                state,
                { error: '' }
            )
        default:
            return state;
    }
}

export default auth;
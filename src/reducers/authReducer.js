const initialState = {
    isFetching: false,
    user: {}, 
    error: ''
}

const auth = (state = initialState, action) => {
    switch (action.type) {
        case 'REQUEST_LOGIN':
            return Object.assign(
                {},
                state,
                { isFetching: true, error: '' }
            )
        case 'FINISH_LOGIN':
            return Object.assign(
                {},
                state,
                { isFetching: false, user: action.user }
            )
        case 'FAILED_LOGIN':
            return Object.assign(
                {},
                state,
                { isFetching: false, error: action.error }
            )
        default:
            return state;
    }
}

export default auth;
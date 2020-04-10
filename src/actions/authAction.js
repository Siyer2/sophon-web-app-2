const initialState = {
    isFetching: false,
    user: {}
}

const auth = (state = initialState, action) => {
    switch (action.type) {
        case 'REQUEST_LOGIN':
            return Object.assign(
                {},
                state,
                { isFetching: true }
            )
        case 'FINISH_LOGIN':
            return Object.assign(
                {},
                state,
                { isFetching: false, user: action.user }
            )
            
        default:
            return state;
    }
}

export default auth;
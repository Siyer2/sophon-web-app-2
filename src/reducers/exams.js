const initialState = {
    isFetching: false,
    exams: [],
    error: ''
}

const auth = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCHING_EXAMS':
            return Object.assign(
                {},
                state,
                { isFetching: true, error: '' }
            )
        case 'RECEIVE_EXAMS':
            return Object.assign(
                {},
                state,
                { isFetching: false, exams: action.exams }
            )
        case 'FAILED_RECEIVING_EXAMS':
            return Object.assign(
                {},
                state,
                { isFetching: false, error: action.error }
            )
        case 'CLEAR_EXAMS':
            return Object.assign(
                {},
                state,
                { exams: [] }
            )
        default:
            return state;
    }
}

export default auth;
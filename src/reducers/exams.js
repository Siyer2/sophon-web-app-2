const initialState = {
    isFetching: false,
    exams: [],
    error: '', 
    newExamModalOpen: false
}

const exams = (state = initialState, action) => {
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
        case 'TOGGLE_NEW_EXAM_MODAL':
            return Object.assign(
                {},
                state,
                { newExamModalOpen: !state.newExamModalOpen }
            )
        default:
            return state;
    }
}

export default exams;
const initialState = {
    isFetching: false,
    exams: [],
    error: '', 
    newExamModalOpen: false, 
    applications: []
}

const exams = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCHING_EXAMS':
        case 'FETCHING_APPLICATIONS':
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
        case 'FAILED_RECEIVING_APPLICATIONS':
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
        case 'RECEIVE_APPLICATIONS':
            return Object.assign(
                {},
                state,
                { isFetching: false, applications: action.applications }
            )
        default:
            return state;
    }
}

export default exams;
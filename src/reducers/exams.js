const initialState = {
    isFetching: false,
    exams: [],
    error: '', 
    newExamModalOpen: false, 
    applications: [], 
    creatingExam: false, 
    newExam: '', 
    enterExamError: '', 
    enteringExam: false, 
    examEntranceId: '', 
    deletingExam: false
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
                { isFetching: false, error: action.error ? action.error : 'Unknown Error'}
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
        case 'CREATING_EXAM':
            return Object.assign(
                {},
                state,
                { creatingExam: true }
            )
        case 'FINISHED_CREATING_EXAM':
            return Object.assign(
                {},
                state,
                { creatingExam: false, newExam: action.exam }
            )
        case 'FAILED_CREATING_EXAM':
            return Object.assign(
                {},
                state,
                { creatingExam: false, error: action.error ? action.error : 'Unknown Error'}
            )
        case 'CLEAR_EXAM_MODAL_DATA':
            return Object.assign(
                {},
                state,
                { newExam: '', error: ''}
            )
        case 'REQUEST_ENTER_EXAM':
            return Object.assign(
                {},
                state,
                { enteringExam: true }
            )
        case 'SUCCESS_ENTERING_EXAM':
            return Object.assign(
                {},
                state,
                { enteringExam: false, examEntranceId: action.examEntranceId }
            )
        case 'FAILED_ENTERING_EXAM':
            return Object.assign(
                {},
                state,
                { enteringExam: false, enterExamError: action.error }
            )
        case 'REQUEST_DELETING_EXAM':
            return Object.assign(
                {},
                state,
                { deletingExam: true }
            )
        case 'FAILED_DELETING_EXAM':
            return Object.assign(
                {},
                state,
                { deletingExam: false, error: action.error }
            )
        case 'FINISHED_DELETING_EXAM':
            return Object.assign(
                {},
                state,
                { deletingExam: false }
            )
        default:
            return state;
    }
}

export default exams;
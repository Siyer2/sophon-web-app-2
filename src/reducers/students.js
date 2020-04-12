const initialState = {
    isFetching: false, 
    students: [], 
    error: ''
}

const students = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCHING_STUDENT_LIST':
            return Object.assign(
                {},
                state,
                { isFetching: true, error: '' }
            )
        case 'RECEIVE_STUDENT_LIST':
            return Object.assign(
                {},
                state,
                { isFetching: false, students: action.students }
            )
        case 'FAILED_RECEIVING_STUDENT_LIST':
            return Object.assign(
                {},
                state,
                { isFetching: false, error: action.error }
            )

        default:
            return state;
    }
}

export default students;
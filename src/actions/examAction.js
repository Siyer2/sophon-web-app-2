import config from '../config';
const api = config.API;

//==== Action Creators ====//
function fetchingExams() {
    return {
        type: 'FETCHING_EXAMS'
    }
}

function receivedExams(data) {
    return {
        type: 'RECEIVE_EXAMS', 
        exams: data.exams
    }
}

function failedReceivingExams() {
    return {
        type: 'FAILED_RECEIVING_EXAMS'
    }
}

//==== User Requests ====//
export function getExamList() {
    return function(dispatch) {
        dispatch(fetchingExams());
        return api({
            method: 'get', 
            url: '/exam/list'
        })
        .then(
            response => {
                return response.data;
            },
            error => {
                console.log("error listing exams", error);
            }
        )
        .then(
            json => {
                if (json.error) {
                    dispatch(failedReceivingExams(json.error));
                }
                else {
                    dispatch(receivedExams(json));
                }
            }
        )
    }
}
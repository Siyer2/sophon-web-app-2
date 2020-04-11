import config from '../config';
import { authHeader } from '../helpers/authHeader';
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

function clearExamList() {
    return {
        type: 'CLEAR_EXAMS'
    }
}

//==== User Requests ====//
export function getExamList() {
    return function(dispatch) {
        dispatch(fetchingExams());
        return api({
            method: 'get', 
            url: '/exam/list', 
            headers: authHeader()
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

export function clearExams() {
    return function(dispatch) {
        dispatch(clearExamList());
    }
}

export function reloadExams() {
    return function(dispatch) {
        dispatch(getExamList());
    }
}
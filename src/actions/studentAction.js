import config from '../config';
import { authHeader } from '../helpers/authHeader';
const api = config.API;

//==== Action Creators ====//
function fetchingStudentList() {
    return {
        type: 'FETCHING_STUDENT_LIST'
    }
}

function receivedStudentList(data) {
    return {
        type: 'RECEIVE_STUDENT_LIST', 
        students: data.students
    }
}

function failedReceivingStudentList() {
    return {
        type: 'FAILED_RECEIVING_STUDENT_LIST'
    }
}

//==== User Requests ====//
export function getStudentList(examId) {
    return function(dispatch) {
        dispatch(fetchingStudentList());
        return api({
            method: 'post',
            url: '/exam/studentlist',
            headers: authHeader(), 
            data: {
                examId
            }
        })
        .then(
            response => {
                return response.data;
            }, 
            error => {
                console.log("error getting student list", error);
            }
        )
        .then(
            json => {
                if (json.error) {
                    dispatch(failedReceivingStudentList(json.error));
                }
                else {
                    dispatch(receivedStudentList(json));
                }
            }
        )
        .catch(
            error => {
                console.log("error", error);
                dispatch(failedReceivingStudentList(error));
            }
        )
    }
}
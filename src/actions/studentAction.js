import download from 'js-file-download';
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

function downloadingSubmission() {
    return {
        type: 'DOWNLOADING_SUBMISSION'
    }
}

function downloadedSubmission() {
    return {
        type: 'DOWNLOADED_SUBMISSION'
    }
}

function failedDownloadingSubmission(error) {
    return {
        type: 'FAILED_DOWNLOADING_SUBMISSION', 
        error: error
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
                dispatch(failedReceivingStudentList(error));
            }
        )
    }
}

export function downloadStudentSubmission(studentId, submissionLocation) {
    return function(dispatch) {
        dispatch(downloadingSubmission());
        return api({
            method: 'post', 
            url: '/exam/download', 
            headers: authHeader(), 
            responseType: 'arraybuffer',
            data: {
                studentId, 
                submissionLocation
            }
        })
        .then(
            async response => {
                download(response.data, `${studentId}.zip`);
                dispatch(downloadedSubmission());
            },
            error => {
                console.log("error getting student list", error);
                dispatch(failedDownloadingSubmission(error));
            }
            )
            .catch(
                error => {
                    console.log("error getting student list", error);
                    dispatch(failedDownloadingSubmission(error));
            }
        )
    }
}

export function reloadStudents(examId) {
    return function (dispatch) {
        dispatch(getStudentList(examId));
    }
}
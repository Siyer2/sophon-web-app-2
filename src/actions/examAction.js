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

function fetchingApplications() {
    return {
        type: 'FETCHING_APPLICATIONS'
    }
}

function receivedApplications(data) {
    return {
        type: 'RECEIVE_APPLICATIONS',
        applications: data.applications
    }
}

function failedReceivingApplications() {
    return {
        type: 'FAILED_RECEIVING_APPLICATIONS'
    }
}

function creatingExam() {
    return {
        type: 'CREATING_EXAM'
    }
}

function finishedCreatingExam(data) {
    return {
        type: 'FINISHED_CREATING_EXAM',
        exam: data.exam
    }
}

function failedCreatingExam() {
    return {
        type: 'FAILED_CREATING_EXAM'
    }
}

function clearExamList() {
    return {
        type: 'CLEAR_EXAMS'
    }
}

function toggleNewExamModal() {
    return {
        type: 'TOGGLE_NEW_EXAM_MODAL'
    }
}

function clearExamModalData() {
    return {
        type: 'CLEAR_EXAM_MODAL_DATA'
    }
}

//==== User Requests ====//
export function getExamList() {
    return function (dispatch) {
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
            .catch(
                error => {
                    console.log("error", error);
                    dispatch(failedReceivingExams(error));
                }
            )
    }
}

export function getApplications() {
    return function (dispatch) {
        dispatch(fetchingApplications());
        return api({
            method: 'get',
            url: '/exam/applications',
            headers: authHeader()
        })
            .then(
                response => {
                    return response.data;
                },
                error => {
                    console.log("error listing applications", error);
                }
            )
            .then(
                json => {
                    if (json.error) {
                        dispatch(failedReceivingApplications(json.error));
                    }
                    else {
                        dispatch(receivedApplications(json));
                    }
                }
            )
            .catch(
                error => {
                    console.log("error", error);
                    dispatch(failedReceivingApplications(error));
                }
            )
    }
}

export function createExam(examName, file, applicationId) {
    return function (dispatch) {
        dispatch(creatingExam());
        
        var bodyFormData = new FormData();
        bodyFormData.set("examName", examName);
        bodyFormData.set("applicationId", applicationId);
        bodyFormData.append("file", file); 

        return api({
            method: 'post',
            url: '/exam/create',
            headers: Object.assign({ 'Content-Type': 'multipart/form-data' }, authHeader()), 
            data: bodyFormData
        })
        .then(
            response => {
                return response.data;
            },
            error => {
                console.log("error listing applications", error);
            }
        )
        .then(
            json => {
                if (json.error) {
                    dispatch(failedCreatingExam(json.error));
                }
                else {
                    dispatch(finishedCreatingExam(json));
                    dispatch(reloadExams());
                }
            }
        )
        .catch(
            error => {
                console.log("error", error);
                dispatch(failedCreatingExam(error));
            }
        )
    }
}

export function clearExams() {
    return function (dispatch) {
        dispatch(clearExamList());
    }
}

export function reloadExams() {
    return function (dispatch) {
        dispatch(getExamList());
    }
}

export function toggleExamModal() {
    return function (dispatch) {
        dispatch(toggleNewExamModal());
        dispatch(clearExamModalData());
    }
}
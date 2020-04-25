import download from 'js-file-download';
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

function toggleClosingExam() {
    return {
        type: 'TOGGLE_CLOSE_EXAM'
    }
}

function finishedTogglingExam() {
    return {
        type: 'FINISHED_TOGGLING_EXAM'
    }
}

function errorTogglingExam() {
    return {
        type: 'ERROR_TOGGLING_EXAM'
    }
}

function requestEnteringExam() {
    return {
        type: 'REQUEST_ENTER_EXAM'
    }
}

function successEnteringExam(data) {
    return {
        type: 'SUCCESS_ENTERING_EXAM',
        examEntranceId: data.examEntranceId
    }
}

function failedEnteringExam(error) {
    error = error ? error : 'Unknown Error.'
    return {
        type: 'FAILED_ENTERING_EXAM', 
        error
    }
}

function requestDeletingExam() {
    return {
        type: 'REQUEST_DELETING_EXAM'
    }
}

function failedDeletingExam(error) {
    error = error ? error : 'Unknown Error.'
    return {
        type: 'FAILED_DELETING_EXAM',
        error
    }
}

function finishedDeletingExam() {
    return {
        type: 'FINISHED_DELETING_EXAM'
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

export function toggleCloseExam(examId) {
    return function (dispatch) {
        dispatch(toggleClosingExam());
        return api({
            method: 'post',
            url: '/exam/toggleClose',
            headers: authHeader(), 
            data: {examId}
        })
        .then(
            response => {
                return response.data;
            },
            error => {
                console.log("error toggle closing exam", error);
            }
        )
        .then(
            json => {
                if (json.error) {
                    dispatch(errorTogglingExam(json.error));
                }
                else {
                    console.log("json", json);
                    dispatch(finishedTogglingExam(json));
                    dispatch(reloadExams());
                }
            }
        )
        .catch(
            error => {
                console.log("error", error);
                dispatch(errorTogglingExam(error));
            }
        )
    }
}

export function deleteExam(examId) {
    return function (dispatch) {
        dispatch(requestDeletingExam());
        return api({
            method: 'post',
            url: '/exam/delete',
            headers: authHeader(),
            data: { examId }
        })
            .then(
                response => {
                    return response.data;
                },
                error => {
                    console.log("error deleting exam", error);
                }
            )
            .then(
                json => {
                    if (json.error) {
                        dispatch(failedDeletingExam(json.error));
                    }
                    else {
                        dispatch(finishedDeletingExam());
                        dispatch(reloadExams());
                    }
                }
            )
            .catch(
                error => {
                    console.log("caught error toggling exam", error);
                    dispatch(failedDeletingExam(error));
                }
            )
    }
}

export function enterExam(examCode, studentId) {
    return function (dispatch) {
        dispatch(requestEnteringExam());
        return api({
            method: 'post', 
            url: '/exam/enter', 
            data: {
                examCode, 
                studentId
            }
        })
            .then(
                response => {
                    return response.data;
                }, 
                error => {
                    dispatch(failedEnteringExam(error))
                    console.log("error entering exam", error);
                }
            )
            .then(
                json => {
                    if (json.error) {
                        dispatch(failedEnteringExam(json.error));
                    }
                    else {
                        dispatch(successEnteringExam(json));

                        // Download the seb file
                        downloadSEBFile(json.examEntranceId, `${examCode}_${studentId}`);
                    }
                }
            )
            .catch(
                error => {
                    console.log("caught error entering exam", error);
                    dispatch(failedEnteringExam(error));
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

//==== Helper Functions ====//
function downloadSEBFile(examEntranceId, filename) {
    var data = `<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE plist PUBLIC "-//Apple Computer//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
  <dict>
    <key>originatorVersion</key>
    <string>SEB_Win_2.0RC</string>
    <key>startURL</key>
    <string>INSERT_INSTANCE_SERVER_URL/?_id=INSERT_EXAM_ENTRANCE_ID</string>
    <key>sendBrowserExamKey</key>
    <true />
  </dict>
</plist>`;
    download(data.replace("INSERT_INSTANCE_SERVER_URL", config.INSTANCE_SERVER_URL).replace("INSERT_EXAM_ENTRANCE_ID", examEntranceId), `${filename}.seb`);
}
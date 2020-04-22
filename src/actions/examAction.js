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
                        // dispatch(errorTogglingExam(json.error));
                    }
                    else {
                        console.log("json", json);
                        // dispatch(finishedTogglingExam(json));
                        dispatch(reloadExams());
                    }
                }
            )
            .catch(
                error => {
                    console.log("caught error toggling exam", error);
                    // dispatch(errorTogglingExam(error));
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
    const data = `<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE plist PUBLIC "-//Apple Computer//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
  <dict>
    <key>originatorVersion</key>
    <string>SEB_Win_2.0RC</string>
    <key>startURL</key>
    <string>https://q-83.com?_id=INSERT_EXAM_ENTRANCE_ID</string>
    <key>sebServerURL</key>
    <string />
    <key>hashedAdminPassword</key>
    <string />
    <key>allowQuit</key>
    <true />
    <key>ignoreExitKeys</key>
    <true />
    <key>ignoreQuitPassword</key>
    <false />
    <key>hashedQuitPassword</key>
    <string />
    <key>exitKey1</key>
    <integer>2</integer>
    <key>exitKey2</key>
    <integer>10</integer>
    <key>exitKey3</key>
    <integer>5</integer>
    <key>sebMode</key>
    <integer>0</integer>
    <key>sebConfigPurpose</key>
    <integer>0</integer>
    <key>allowPreferencesWindow</key>
    <false />
    <key>browserViewMode</key>
    <integer>0</integer>
    <key>mainBrowserWindowWidth</key>
    <string>100%</string>
    <key>mainBrowserWindowHeight</key>
    <string>100%</string>
    <key>mainBrowserWindowPositioning</key>
    <integer>1</integer>
    <key>enableBrowserWindowToolbar</key>
    <false />
    <key>hideBrowserWindowToolbar</key>
    <false />
    <key>showMenuBar</key>
    <false />
    <key>showTaskBar</key>
    <true />
    <key>taskBarHeight</key>
    <integer>40</integer>
    <key>newBrowserWindowByLinkPolicy</key>
    <integer>2</integer>
    <key>newBrowserWindowByScriptPolicy</key>
    <integer>2</integer>
    <key>newBrowserWindowByLinkBlockForeign</key>
    <false />
    <key>newBrowserWindowByScriptBlockForeign</key>
    <false />
    <key>newBrowserWindowByLinkWidth</key>
    <string>1000</string>
    <key>newBrowserWindowByLinkHeight</key>
    <string>100%</string>
    <key>newBrowserWindowByLinkPositioning</key>
    <integer>2</integer>
    <key>enablePlugIns</key>
    <true />
    <key>enableJava</key>
    <false />
    <key>enableJavaScript</key>
    <true />
    <key>blockPopUpWindows</key>
    <false />
    <key>allowBrowsingBackForward</key>
    <false />
    <key>enableSebBrowser</key>
    <true />
    <key>allowDownUploads</key>
    <true />
    <key>downloadDirectoryOSX</key>
    <string>~/Downloads</string>
    <key>downloadDirectoryWin</key>
    <string>Desktop</string>
    <key>openDownloads</key>
    <false />
    <key>chooseFileToUploadPolicy</key>
    <integer>0</integer>
    <key>downloadPDFFiles</key>
    <false />
    <key>examKeySalt</key>
    <data>knyqrU8AghoA9rEwHPtrX1e7llp34exXrJu1ZXRQOJ8=</data>
    <key>browserExamKey</key>
    <string />
    <key>browserURLSalt</key>
    <true />
    <key>sendBrowserExamKey</key>
    <false />
    <key>quitURL</key>
    <string />
    <key>monitorProcesses</key>
    <false />
    <key>allowSwitchToApplications</key>
    <false />
    <key>allowFlashFullscreen</key>
    <false />
    <key>permittedProcesses</key>
    <array>
      <dict>
        <key>active</key>
        <true />
        <key>autostart</key>
        <true />
        <key>autohide</key>
        <true />
        <key>allowUserToChooseApp</key>
        <false />
        <key>strongKill</key>
        <true />
        <key>os</key>
        <integer>1</integer>
        <key>title</key>
        <string>SEB</string>
        <key>description</key>
        <string />
        <key>executable</key>
        <string>xulrunner.exe</string>
        <key>path</key>
        <string>../xulrunner/</string>
        <key>identifier</key>
        <string>XULRunner</string>
        <key>arguments</key>
        <array></array>
      </dict>
    </array>
    <key>prohibitedProcesses</key>
    <array></array>
    <key>enableURLFilter</key>
    <false />
    <key>enableURLContentFilter</key>
    <false />
    <key>URLFilterRules</key>
    <array></array>
    <key>embeddedCertificates</key>
    <array></array>
    <key>proxySettingsPolicy</key>
    <integer>0</integer>
    <key>proxies</key>
    <dict>
      <key>ExceptionsList</key>
      <array></array>
      <key>ExcludeSimpleHostnames</key>
      <true />
      <key>AutoDiscoveryEnabled</key>
      <false />
      <key>AutoConfigurationEnabled</key>
      <false />
      <key>AutoConfigurationJavaScript</key>
      <string />
      <key>AutoConfigurationURL</key>
      <string />
      <key>FTPPassive</key>
      <true />
      <key>HTTPEnable</key>
      <false />
      <key>HTTPPort</key>
      <integer>0</integer>
      <key>HTTPProxy</key>
      <string />
      <key>HTTPRequiresPassword</key>
      <false />
      <key>HTTPUsername</key>
      <string />
      <key>HTTPPassword</key>
      <string />
      <key>HTTPSEnable</key>
      <false />
      <key>HTTPSPort</key>
      <integer>0</integer>
      <key>HTTPSProxy</key>
      <string />
      <key>HTTPSRequiresPassword</key>
      <false />
      <key>HTTPSUsername</key>
      <string />
      <key>HTTPSPassword</key>
      <string />
      <key>FTPEnable</key>
      <false />
      <key>FTPPort</key>
      <integer>0</integer>
      <key>FTPProxy</key>
      <string />
      <key>FTPRequiresPassword</key>
      <false />
      <key>FTPUsername</key>
      <string />
      <key>FTPPassword</key>
      <string />
      <key>SOCKSEnable</key>
      <false />
      <key>SOCKSPort</key>
      <integer>0</integer>
      <key>SOCKSProxy</key>
      <string />
      <key>SOCKSRequiresPassword</key>
      <false />
      <key>SOCKSUsername</key>
      <string />
      <key>SOCKSPassword</key>
      <string />
      <key>RTSPEnable</key>
      <false />
      <key>RTSPPort</key>
      <integer>0</integer>
      <key>RTSPProxy</key>
      <string />
      <key>RTSPRequiresPassword</key>
      <false />
      <key>RTSPUsername</key>
      <string />
      <key>RTSPPassword</key>
      <string />
    </dict>
    <key>sebServicePolicy</key>
    <integer>1</integer>
    <key>allowVirtualMachine</key>
    <false />
    <key>createNewDesktop</key>
    <true />
    <key>killExplorerShell</key>
    <false />
    <key>allowUserSwitching</key>
    <true />
    <key>enableLogging</key>
    <false />
    <key>logDirectoryOSX</key>
    <string>~/Documents</string>
    <key>logDirectoryWin</key>
    <string>My Documents</string>
    <key>insideSebEnableSwitchUser</key>
    <false />
    <key>insideSebEnableLockThisComputer</key>
    <false />
    <key>insideSebEnableChangeAPassword</key>
    <false />
    <key>insideSebEnableStartTaskManager</key>
    <false />
    <key>insideSebEnableLogOff</key>
    <false />
    <key>insideSebEnableShutDown</key>
    <false />
    <key>insideSebEnableEaseOfAccess</key>
    <false />
    <key>insideSebEnableVmWareClientShade</key>
    <false />
    <key>outsideSebEnableSwitchUser</key>
    <true />
    <key>outsideSebEnableLockThisComputer</key>
    <true />
    <key>outsideSebEnableChangeAPassword</key>
    <true />
    <key>outsideSebEnableStartTaskManager</key>
    <true />
    <key>outsideSebEnableLogOff</key>
    <true />
    <key>outsideSebEnableShutDown</key>
    <true />
    <key>outsideSebEnableEaseOfAccess</key>
    <true />
    <key>outsideSebEnableVmWareClientShade</key>
    <true />
    <key>hookKeys</key>
    <true />
    <key>enableEsc</key>
    <false />
    <key>enableCtrlEsc</key>
    <false />
    <key>enableAltEsc</key>
    <false />
    <key>enableAltTab</key>
    <true />
    <key>enableAltF4</key>
    <false />
    <key>enableStartMenu</key>
    <false />
    <key>enableRightMouse</key>
    <false />
    <key>enablePrintScreen</key>
    <false />
    <key>enableF1</key>
    <false />
    <key>enableF2</key>
    <false />
    <key>enableF3</key>
    <false />
    <key>enableF4</key>
    <false />
    <key>enableF5</key>
    <true />
    <key>enableF6</key>
    <false />
    <key>enableF7</key>
    <false />
    <key>enableF8</key>
    <false />
    <key>enableF9</key>
    <false />
    <key>enableF10</key>
    <false />
    <key>enableF11</key>
    <false />
    <key>enableF12</key>
    <false />
  </dict>
</plist>`;
    download(data.replace("INSERT_EXAM_ENTRANCE_ID", examEntranceId), `${filename}.seb`);
}
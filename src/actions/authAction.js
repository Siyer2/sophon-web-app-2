import { history } from '../helpers/history';
import { authHeader } from '../helpers/authHeader';
import { clearExams, getExamList } from './examAction';
import config from '../config';
const api = config.API;

//==== Action Creators ====//
function requestLogin() {
    return {
        type: 'REQUEST_LOGIN'
    }
}

function finishLogin(data) {
    return {
        type: 'FINISH_LOGIN', 
        user: data.user
    }
}

function failedLogin(error) {
    return {
        type: 'FAILED_LOGIN', 
        error
    }
}

function clearUser() {
    return {
        type: 'CLEAR_USER'
    }
}

//==== User Requests ====//
export function login(email, password) {
    return function(dispatch) {
        dispatch(requestLogin());

        return api({
            method: 'post', 
            url: '/auth/login', 
            data: {
                email,
                password
            }, 
            headers: authHeader()
        })
        .then(
            response => {
                return response.data;
            }, 
            error => {
                console.log("error logging in", error);
            }
        )
        .then(
            json => {
                if (json.error) {
                    dispatch(failedLogin(json.error));
                }
                else {
                    dispatch(finishLogin(json));
                    json.user.token = json.token;
                    localStorage.setItem('user', JSON.stringify(json.user));
                    dispatch(getExamList());
                    history.push('/exams');
                }
            }
        )
    }
}

export function logout() {
    return function(dispatch) {
        localStorage.removeItem('user');
        dispatch(clearUser());
        dispatch(clearExams());
    }
}

export function reloadUser() {
    return function(dispatch) {
        let user = JSON.parse(localStorage.getItem('user'));
        dispatch(finishLogin({ user }));
    }
}
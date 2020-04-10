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

//==== User Requests ====//
export function login(email, password) {
    return function(dispatch) {
        dispatch(requestLogin());

        return api({
            method: 'post', 
            url: '/login', 
            data: {
                email,
                password
            }
        })
        .then(
            response => {
                return response.data;
            }, 
            error => {
                console.log("error logging in", error);
                // TODO: create a failed login action creator
            }
        )
        .then(
            json => {
                if (json.error) {
                    dispatch(failedLogin(json.error));
                }
                else {
                    dispatch(finishLogin(json));
                    // TODO: set token to json.token
                }
            }
        )
    }
}

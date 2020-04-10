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
            response => response.data, 
            error => {
                console.log("error logging in", error);
                // TODO: create a failed login action creator
            }
        )
        .then(
            json => {
                dispatch(finishLogin(json));
                // TODO: set token to json.token
            }
        )
    }
}

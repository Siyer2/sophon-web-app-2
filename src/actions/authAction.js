import axios from 'axios';

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

        return axios({
            method: 'post', 
            url: 'http://localhost:5902/login', 
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

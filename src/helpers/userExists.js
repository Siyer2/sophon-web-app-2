import config from '../config';
const api = config.API;

export function userExists() {
    let user = JSON.parse(localStorage.getItem('user'));
    
    if (user && user.token) {
        return api({
            method: 'get',
            url: '/auth',
            headers: { 'Authorization': 'Bearer ' + user.token }
        })
        .then(
            response => {
                return response.status === 200 ? true : false;
            }
        )
        .catch(
            () => {
                return false;
            }
        )
    }
    else {
        return false;
    }
}
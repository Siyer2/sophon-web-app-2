import { history } from '../helpers/history';
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
                if (response.status === 200) {
                    return true;
                }
                else {
                    redirectToHome();
                    return false;
                }
            }
        )
        .catch(
            () => {
                redirectToHome();
                return false;
            }
        )
    }
    else {
        return false;
    }
}

function redirectToHome() {
    history.push('/');
}
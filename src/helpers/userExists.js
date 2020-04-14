import { history } from '../helpers/history';

export function userExists() {
    let user = JSON.parse(localStorage.getItem('user'));
    
    if (user && user.token) {
        return true;
    }
    else {
        redirectToHome();
        return false;
    }
}

function redirectToHome() {
    history.push('/');
}
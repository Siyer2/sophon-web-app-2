import { reloadUser } from './authAction';

//==== User Requests ====//
export function reload(pathname) {
    return function(dispatch) {
        switch (pathname) {
            case "/exams":
                dispatch(reloadUser());
                break;
        
            default:
                break;
        }
    }
}
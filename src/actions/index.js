import { reloadUser } from './authAction';
import { reloadExams } from './examAction';

//==== User Requests ====//
export function reload(pathname) {
    return function(dispatch) {
        switch (pathname) {
            case "/exams":
                dispatch(reloadUser());
                dispatch(reloadExams());
                break;
        
            default:
                break;
        }
    }
}
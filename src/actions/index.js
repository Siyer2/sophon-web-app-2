import { reloadUser } from './authAction';
import { reloadExams } from './examAction';
import { reloadStudents } from './studentAction';

//==== User Requests ====//
export function reload(pathname) {
    
    return function(dispatch) {
        const examId = pathname.split("/exams/").pop();
        if (examId) {
            dispatch(reloadStudents(pathname.split("/exams/").pop()));
        }

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
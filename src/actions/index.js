import { reloadUser } from './authAction';

//==== Action Creators ====//
function startReload() {
    return {
        type: 'START_RELOAD'
    }
}

function finishReload() {
    return {
        type: 'FINISH_RELOAD'
    }
}

//==== User Requests ====//
export function reload(pathname) {
    return function(dispatch) {
        dispatch(startReload());
        switch (pathname) {
            case "/exams":
                dispatch(reloadUser());
                break;
        
            default:
                break;
        }
        dispatch(finishReload());
    }
}
import { combineReducers } from 'redux';
import auth from './auth';
import exams from './exams';

const rootReducer = combineReducers({
    auth,
    exams
});
export default rootReducer;
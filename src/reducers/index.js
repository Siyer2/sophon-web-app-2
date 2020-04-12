import { combineReducers } from 'redux';
import auth from './auth';
import exams from './exams';
import students from './students';

const rootReducer = combineReducers({
    auth,
    exams,
    students
});
export default rootReducer;
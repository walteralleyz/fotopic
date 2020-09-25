import { combineReducers } from 'redux';
import user from './userreducer';

export default combineReducers({
    user: user
});
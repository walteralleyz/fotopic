import { combineReducers } from 'redux';
import user from './userreducer';
import item from './itemreducer';

export default combineReducers({ user, item });
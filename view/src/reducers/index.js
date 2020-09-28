import { combineReducers } from 'redux';
import user from './userreducer';
import item from './itemreducer';
import toast from './toastreducer';

export default combineReducers({ user, item, toast });
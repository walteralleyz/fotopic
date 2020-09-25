import * as actions from './actiontypes';

export const addItem = item => ({
    type: actions.ADD_ITEM,
    item
});

export const removeItem = id => ({
    type: actions.REMOVE_ITEM,
    id
});
import * as actions from './actiontypes';

export const toastText = text => ({
    type: actions.TOAST_TEXT,
    text
});

export const toastStatus = status => ({
    type: actions.TOAST_STATUS,
    status
});